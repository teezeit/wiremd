import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

import { project } from "../db/schema.js";
import { defaultValidationHook } from "../middleware/error.js";
import type { AppEnv } from "../types.js";

const ID_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;
const notFound = () => new HTTPException(404, { message: "Not found" });

const IdParam = z.object({
  id: z.string().openapi({ param: { name: "id", in: "path" } }),
});

const LockBody = z.object({
  clientId: z.string().min(1),
  name: z.string().min(1),
  force: z.boolean().optional().default(false),
});

const UnlockBody = z.object({ clientId: z.string().min(1), force: z.boolean().optional().default(false) });

const LockResponse = z.object({ lockedBy: z.string(), lockedName: z.string() });
const ErrorResponse = z.object({ error: z.string() });

const acquireRoute = createRoute({
  method: "post",
  path: "/{id}/lock",
  tags: ["Projects"],
  summary: "Acquire or steal a lock",
  request: {
    params: IdParam,
    body: { required: true, content: { "application/json": { schema: LockBody } } },
  },
  responses: {
    200: { description: "Lock acquired", content: { "application/json": { schema: LockResponse } } },
    404: { description: "Not found", content: { "application/json": { schema: ErrorResponse } } },
    409: { description: "Already locked", content: { "application/json": { schema: ErrorResponse } } },
  },
});

const releaseRoute = createRoute({
  method: "delete",
  path: "/{id}/lock",
  tags: ["Projects"],
  summary: "Release a lock",
  request: {
    params: IdParam,
    body: { required: true, content: { "application/json": { schema: UnlockBody } } },
  },
  responses: {
    200: { description: "Released (idempotent)" },
    404: { description: "Not found", content: { "application/json": { schema: ErrorResponse } } },
  },
});

export const lockRoute = new OpenAPIHono<AppEnv>({ defaultHook: defaultValidationHook })
  .openapi(acquireRoute, async (c) => {
    const db = c.get("db");
    const { id } = c.req.valid("param");
    if (!ID_PATTERN.test(id)) throw notFound();

    const { clientId, name, force } = c.req.valid("json");

    const row = await db.query.project.findFirst({ where: eq(project.id, id) });
    if (!row) throw notFound();

    // If locked by someone else and force is false → 409
    if (row.lockedBy && row.lockedBy !== clientId && !force) {
      return c.json({ error: `Locked by ${row.lockedName ?? row.lockedBy}` }, 409);
    }

    await db
      .update(project)
      .set({ lockedBy: clientId, lockedName: name })
      .where(eq(project.id, id));

    return c.json({ lockedBy: clientId, lockedName: name }, 200);
  })

  .openapi(releaseRoute, async (c) => {
    const db = c.get("db");
    const { id } = c.req.valid("param");
    if (!ID_PATTERN.test(id)) throw notFound();

    const { clientId, force } = c.req.valid("json");

    const row = await db.query.project.findFirst({ where: eq(project.id, id) });
    if (!row) throw notFound();

    // Release if caller holds the lock, OR if force:true (joiner leaving session)
    if (row.lockedBy === clientId || force) {
      await db
        .update(project)
        .set({ lockedBy: null, lockedName: null })
        .where(eq(project.id, id));
    }

    return c.body(null, 200);
  });
