import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import { project, projectFile, INDEX_PATH } from "../db/schema.js";
import { defaultValidationHook } from "../middleware/error.js";
import type { AppEnv } from "../types.js";

const MAX_CONTENT_BYTES = 1_048_576;
const ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

// ===== Schemas =====

const ContentBody = z
  .object({
    content: z
      .string()
      .max(MAX_CONTENT_BYTES)
      .openapi({ example: "# Hello\n\nA wireframe.\n[Save]*" }),
  })
  .openapi("ProjectContentBody");

const UpdateBody = z
  .object({
    content: z
      .string()
      .max(MAX_CONTENT_BYTES)
      .openapi({ example: "# Hello v2\n\n[Save]* [Cancel]" }),
    baseUpdatedAt: z.string().datetime().optional().openapi({
      description:
        "The updatedAt the client started from. If present and stale, the server returns 409 with the current state instead of overwriting.",
      example: "2026-05-01T12:00:00.000Z",
    }),
    clientId: z.string().optional().openapi({
      description: "Session ID of the caller. Required when a lock is held — rejected with 403 if caller does not hold the lock.",
    }),
  })
  .openapi("UpdateProjectBody");

const ConflictResponse = z
  .object({
    content: z.string(),
    updatedAt: z.string().openapi({ example: "2026-05-01T12:00:00.000Z" }),
  })
  .openapi("Conflict");

const IdResponse = z
  .object({
    id: z.string().openapi({ example: "V1StGXR8_Z5jdHi6B-myT" }),
    updatedAt: z.string().openapi({ example: "2026-05-01T12:00:00.000Z" }),
  })
  .openapi("CreateProjectResponse");

const ProjectResponse = z
  .object({
    id: z.string().openapi({ example: "V1StGXR8_Z5jdHi6B-myT" }),
    content: z.string(),
    updatedAt: z.string().openapi({ example: "2026-05-01T12:00:00.000Z" }),
    lockedBy: z.string().nullable(),
    lockedName: z.string().nullable(),
    lastEditorName: z.string().nullable(),
  })
  .openapi("Project");

const UpdatedAtResponse = z
  .object({
    updatedAt: z.string().openapi({ example: "2026-05-01T12:00:00.000Z" }),
  })
  .openapi("UpdatedAt");

const ErrorResponse = z.object({ error: z.string() }).openapi("Error");

// Permissive on purpose: malformed IDs must look identical to unknown IDs (404),
// not 400, to avoid leaking namespace probing signal. Strict regex check happens
// in the handler.
const IdParam = z.object({
  id: z.string().openapi({
    param: { name: "id", in: "path" },
    example: "V1StGXR8_Z5jdHi6B-myT",
  }),
});

// ===== Route definitions =====

const createProjectRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Projects"],
  summary: "Create a project",
  description:
    "Creates a new project with an unguessable nanoid (~125 bits) and stores the given content under index.md.",
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: ContentBody } },
    },
  },
  responses: {
    201: {
      description: "Project created",
      content: { "application/json": { schema: IdResponse } },
    },
    400: {
      description: "Validation error",
      content: { "application/json": { schema: ErrorResponse } },
    },
    413: {
      description: "Payload too large (>1 MB)",
      content: { "application/json": { schema: ErrorResponse } },
    },
  },
});

const getProjectRoute = createRoute({
  method: "get",
  path: "/{id}",
  tags: ["Projects"],
  summary: "Get a project",
  request: { params: IdParam },
  responses: {
    200: {
      description: "Project",
      content: { "application/json": { schema: ProjectResponse } },
    },
    404: {
      description: "Not found (also returned for malformed IDs, by design)",
      content: { "application/json": { schema: ErrorResponse } },
    },
  },
});

const headProjectRoute = createRoute({
  method: "head",
  path: "/{id}",
  tags: ["Projects"],
  summary: "Check project existence",
  description: "Cheap existence check. No body in either response.",
  request: { params: IdParam },
  responses: {
    200: { description: "Exists" },
    404: { description: "Not found" },
  },
});

const updateProjectRoute = createRoute({
  method: "put",
  path: "/{id}",
  tags: ["Projects"],
  summary: "Update a project",
  description:
    "Optimistic concurrency: if baseUpdatedAt is provided and matches the current server state, the write applies. If it's stale, server returns 409 with the current { content, updatedAt }. Without baseUpdatedAt the write is unconditional (last-write-wins).",
  request: {
    params: IdParam,
    body: {
      required: true,
      content: { "application/json": { schema: UpdateBody } },
    },
  },
  responses: {
    200: {
      description: "Updated",
      content: { "application/json": { schema: UpdatedAtResponse } },
    },
    404: {
      description: "Not found",
      content: { "application/json": { schema: ErrorResponse } },
    },
    409: {
      description:
        "Conflict — baseUpdatedAt was stale. Body contains the current server state.",
      content: { "application/json": { schema: ConflictResponse } },
    },
    413: {
      description: "Payload too large (>1 MB)",
      content: { "application/json": { schema: ErrorResponse } },
    },
  },
});

// ===== Handlers =====

const notFound = () => new HTTPException(404, { message: "Not found" });

export const projectsRoute = new OpenAPIHono<AppEnv>({
  defaultHook: defaultValidationHook,
})
  .openapi(createProjectRoute, async (c) => {
    const db = c.get("db");
    const { content } = c.req.valid("json");
    const id = nanoid();
    const fileId = nanoid();

    const now = new Date();
    const inserted = await db.transaction(async (tx) => {
      await tx.insert(project).values({ id, createdAt: now, updatedAt: now });
      const rows = await tx
        .insert(projectFile)
        .values({
          id: fileId,
          projectId: id,
          path: INDEX_PATH,
          content,
          createdAt: now,
          updatedAt: now,
        })
        .returning({ updatedAt: projectFile.updatedAt });
      return rows[0]!;
    });

    return c.json({ id, updatedAt: inserted.updatedAt.toISOString() }, 201);
  })

  .openapi(getProjectRoute, async (c) => {
    const db = c.get("db");
    const { id } = c.req.valid("param");
    if (!ID_PATTERN.test(id)) throw notFound();

    const [row, proj] = await Promise.all([
      db.query.projectFile.findFirst({
        where: and(eq(projectFile.projectId, id), eq(projectFile.path, INDEX_PATH)),
      }),
      db.query.project.findFirst({ where: eq(project.id, id) }),
    ]);
    if (!row || !proj) throw notFound();

    return c.json(
      {
        id,
        content: row.content,
        updatedAt: row.updatedAt.toISOString(),
        lockedBy: proj.lockedBy ?? null,
        lockedName: proj.lockedName ?? null,
        lastEditorName: proj.lastEditorName ?? null,
      },
      200,
    );
  })

  .openapi(headProjectRoute, async (c) => {
    const db = c.get("db");
    const { id } = c.req.valid("param");
    if (!ID_PATTERN.test(id)) return c.body(null, 404);

    const exists = await db.query.project.findFirst({
      where: eq(project.id, id),
      columns: { id: true },
    });
    return c.body(null, exists ? 200 : 404);
  })

  .openapi(updateProjectRoute, async (c) => {
    const db = c.get("db");
    const { id } = c.req.valid("param");
    if (!ID_PATTERN.test(id)) throw notFound();

    const { content, baseUpdatedAt, clientId } = c.req.valid("json");
    const now = new Date();
    const baseDate = baseUpdatedAt ? new Date(baseUpdatedAt) : null;

    // Enforce lock ownership: if a lock is held, only the lock holder may write
    const proj = await db.query.project.findFirst({ where: eq(project.id, id) });
    if (!proj) throw notFound();
    if (proj.lockedBy && proj.lockedBy !== clientId) {
      return c.json({
        error: `Write rejected: project is locked by ${proj.lockedName ?? proj.lockedBy}. To acquire the lock, POST /api/projects/${id}/lock with your clientId and name, then retry the write.`,
        lockedBy: proj.lockedBy,
        lockedName: proj.lockedName,
      }, 403);
    }

    const result = await db.transaction(async (tx) => {
      const conditions = [
        eq(projectFile.projectId, id),
        eq(projectFile.path, INDEX_PATH),
      ];
      if (baseDate) conditions.push(eq(projectFile.updatedAt, baseDate));

      const updated = await tx
        .update(projectFile)
        .set({ content, updatedAt: now })
        .where(and(...conditions))
        .returning({ updatedAt: projectFile.updatedAt });

      if (updated.length === 0) {
        // Either the project doesn't exist OR baseUpdatedAt was stale.
        // Differentiate: 404 for missing, 409 for stale.
        const current = await tx.query.projectFile.findFirst({
          where: and(
            eq(projectFile.projectId, id),
            eq(projectFile.path, INDEX_PATH),
          ),
        });
        if (!current) return { kind: "not-found" as const };
        return { kind: "conflict" as const, current };
      }

      await tx
        .update(project)
        .set({ updatedAt: now })
        .where(eq(project.id, id));
      return { kind: "ok" as const, updatedAt: updated[0]!.updatedAt };
    });

    if (result.kind === "not-found") throw notFound();
    if (result.kind === "conflict") {
      return c.json(
        {
          content: result.current.content,
          updatedAt: result.current.updatedAt.toISOString(),
        },
        409,
      );
    }

    return c.json({ updatedAt: result.updatedAt.toISOString() }, 200);
  });
