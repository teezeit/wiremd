import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { callApp, createTestContext, type TestContext } from "./helpers/setup.js";

const HELLO = "# Hello\n\nA wireframe.\n[Save]*";
const UPDATED = "# Hello v2\n\n[Save]* [Cancel]";

async function createProject(
  ctx: TestContext,
  content: string = HELLO,
): Promise<{ id: string }> {
  const res = await callApp(ctx.app, "/api/projects", {
    method: "POST",
    json: { content },
  });
  expect(res.status).toBe(201);
  return (await res.json()) as { id: string };
}

describe("projects API", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await createTestContext();
  });
  afterEach(async () => {
    await ctx.cleanup();
  });

  describe("POST /api/projects", () => {
    it("creates a project and returns a nanoid-shaped id", async () => {
      const { id } = await createProject(ctx);
      expect(id).toMatch(/^[A-Za-z0-9_-]{21}$/);
    });

    it("returns the freshly-minted updatedAt so clients can use it as the baseline", async () => {
      const res = await callApp(ctx.app, "/api/projects", {
        method: "POST",
        json: { content: HELLO },
      });
      const body = (await res.json()) as { id: string; updatedAt: string };
      expect(body.updatedAt).toBeDefined();
      expect(() => new Date(body.updatedAt).toISOString()).not.toThrow();

      // Subsequent GET should report the same updatedAt.
      const get = await callApp(ctx.app, `/api/projects/${body.id}`);
      const getBody = (await get.json()) as { updatedAt: string };
      expect(getBody.updatedAt).toBe(body.updatedAt);
    });

    it("creates two projects with different ids", async () => {
      const a = await createProject(ctx);
      const b = await createProject(ctx);
      expect(a.id).not.toBe(b.id);
    });

    it("rejects a missing content field with 400", async () => {
      const res = await callApp(ctx.app, "/api/projects", {
        method: "POST",
        json: {},
      });
      expect(res.status).toBe(400);
    });

    it("rejects non-string content with 400", async () => {
      const res = await callApp(ctx.app, "/api/projects", {
        method: "POST",
        json: { content: 123 },
      });
      expect(res.status).toBe(400);
    });

    it("rejects content larger than the body limit with 413", async () => {
      const tooBig = "x".repeat(1_200_000);
      const res = await callApp(ctx.app, "/api/projects", {
        method: "POST",
        json: { content: tooBig },
      });
      expect(res.status).toBe(413);
    });

    it("sets Referrer-Policy: no-referrer on responses", async () => {
      const res = await callApp(ctx.app, "/api/projects", {
        method: "POST",
        json: { content: HELLO },
      });
      expect(res.headers.get("referrer-policy")).toBe("no-referrer");
    });
  });

  describe("GET /api/projects/:id", () => {
    it("returns the content that was just created", async () => {
      const { id } = await createProject(ctx, HELLO);

      const res = await callApp(ctx.app, `/api/projects/${id}`);
      expect(res.status).toBe(200);

      const body = (await res.json()) as {
        id: string;
        content: string;
        updatedAt: string;
      };
      expect(body.id).toBe(id);
      expect(body.content).toBe(HELLO);
      expect(() => new Date(body.updatedAt).toISOString()).not.toThrow();
    });

    it("returns 404 for an unknown id", async () => {
      const res = await callApp(ctx.app, "/api/projects/does-not-exist-xx");
      expect(res.status).toBe(404);
    });

    it("returns 404 (not 400) for a malformed id, indistinguishable from unknown", async () => {
      const malformed = await callApp(ctx.app, "/api/projects/bad%20id");
      const unknown = await callApp(ctx.app, "/api/projects/aaaaaaaaaaaaaaaaaaaaa");
      expect(malformed.status).toBe(404);
      expect(unknown.status).toBe(404);

      const malformedBody = await malformed.json();
      const unknownBody = await unknown.json();
      expect(malformedBody).toEqual(unknownBody);
    });
  });

  describe("HEAD /api/projects/:id", () => {
    it("returns 200 with no body when the project exists", async () => {
      const { id } = await createProject(ctx);
      const res = await callApp(ctx.app, `/api/projects/${id}`, { method: "HEAD" });
      expect(res.status).toBe(200);
      expect(await res.text()).toBe("");
    });

    it("returns 404 when the project does not exist", async () => {
      const res = await callApp(ctx.app, "/api/projects/missing-xxxxxxxxxx", {
        method: "HEAD",
      });
      expect(res.status).toBe(404);
    });
  });

  describe("PUT /api/projects/:id", () => {
    it("updates the content and bumps updatedAt", async () => {
      const { id } = await createProject(ctx, HELLO);

      const before = await callApp(ctx.app, `/api/projects/${id}`);
      const beforeBody = (await before.json()) as { updatedAt: string };

      await new Promise((r) => setTimeout(r, 10));

      const putRes = await callApp(ctx.app, `/api/projects/${id}`, {
        method: "PUT",
        json: { content: UPDATED },
      });
      expect(putRes.status).toBe(200);
      const putBody = (await putRes.json()) as { updatedAt: string };
      expect(new Date(putBody.updatedAt).getTime()).toBeGreaterThan(
        new Date(beforeBody.updatedAt).getTime(),
      );

      const after = await callApp(ctx.app, `/api/projects/${id}`);
      const afterBody = (await after.json()) as { content: string };
      expect(afterBody.content).toBe(UPDATED);
    });

    it("returns 404 for an unknown id", async () => {
      const res = await callApp(ctx.app, "/api/projects/does-not-exist-xx", {
        method: "PUT",
        json: { content: UPDATED },
      });
      expect(res.status).toBe(404);
    });

    it("rejects content larger than the body limit with 413", async () => {
      const { id } = await createProject(ctx);
      const tooBig = "x".repeat(1_200_000);
      const res = await callApp(ctx.app, `/api/projects/${id}`, {
        method: "PUT",
        json: { content: tooBig },
      });
      expect(res.status).toBe(413);
    });

    describe("optimistic concurrency (baseUpdatedAt)", () => {
      it("returns 409 with current state when baseUpdatedAt is stale", async () => {
        const { id } = await createProject(ctx, "v0");
        const initial = await callApp(ctx.app, `/api/projects/${id}`);
        const { updatedAt: baseUpdatedAt } = (await initial.json()) as {
          updatedAt: string;
        };

        // First save with the correct base — succeeds.
        const r1 = await callApp(ctx.app, `/api/projects/${id}`, {
          method: "PUT",
          json: { content: "v1", baseUpdatedAt },
        });
        expect(r1.status).toBe(200);

        // Second save with the same (now stale) base — 409 with current state.
        const r2 = await callApp(ctx.app, `/api/projects/${id}`, {
          method: "PUT",
          json: { content: "v2-from-stale-client", baseUpdatedAt },
        });
        expect(r2.status).toBe(409);
        const conflictBody = (await r2.json()) as {
          content: string;
          updatedAt: string;
        };
        expect(conflictBody.content).toBe("v1");
        expect(() => new Date(conflictBody.updatedAt).toISOString()).not.toThrow();

        // The DB still has v1 — the rejected write was never applied.
        const after = await callApp(ctx.app, `/api/projects/${id}`);
        expect(((await after.json()) as { content: string }).content).toBe("v1");
      });

      it("accepts a save that omits baseUpdatedAt (LWW back-compat)", async () => {
        const { id } = await createProject(ctx, "v0");
        const r = await callApp(ctx.app, `/api/projects/${id}`, {
          method: "PUT",
          json: { content: "lww-overwrite" },
        });
        expect(r.status).toBe(200);

        const after = await callApp(ctx.app, `/api/projects/${id}`);
        expect(((await after.json()) as { content: string }).content).toBe(
          "lww-overwrite",
        );
      });

      it("returns 404 (not 409) for an unknown project even with baseUpdatedAt", async () => {
        const r = await callApp(ctx.app, "/api/projects/does-not-exist-xx", {
          method: "PUT",
          json: { content: "x", baseUpdatedAt: new Date().toISOString() },
        });
        expect(r.status).toBe(404);
      });

      it("returns the new updatedAt on a successful save with matching base", async () => {
        const { id } = await createProject(ctx, "v0");
        const initial = await callApp(ctx.app, `/api/projects/${id}`);
        const { updatedAt: baseUpdatedAt } = (await initial.json()) as {
          updatedAt: string;
        };

        await new Promise((r) => setTimeout(r, 10));

        const r = await callApp(ctx.app, `/api/projects/${id}`, {
          method: "PUT",
          json: { content: "v1", baseUpdatedAt },
        });
        expect(r.status).toBe(200);
        const body = (await r.json()) as { updatedAt: string };
        expect(new Date(body.updatedAt).getTime()).toBeGreaterThan(
          new Date(baseUpdatedAt).getTime(),
        );
      });
    });

    it("does not update other projects (isolation)", async () => {
      const a = await createProject(ctx, "AAA");
      const b = await createProject(ctx, "BBB");

      await callApp(ctx.app, `/api/projects/${a.id}`, {
        method: "PUT",
        json: { content: "AAA-UPDATED" },
      });

      const aRes = await callApp(ctx.app, `/api/projects/${a.id}`);
      const bRes = await callApp(ctx.app, `/api/projects/${b.id}`);
      const aBody = (await aRes.json()) as { content: string };
      const bBody = (await bRes.json()) as { content: string };
      expect(aBody.content).toBe("AAA-UPDATED");
      expect(bBody.content).toBe("BBB");
    });
  });

  describe("end-to-end lifecycle", () => {
    it("create → read → update → read reflects every step", async () => {
      const { id } = await createProject(ctx, "v1");

      const r1 = await callApp(ctx.app, `/api/projects/${id}`);
      expect(((await r1.json()) as { content: string }).content).toBe("v1");

      await callApp(ctx.app, `/api/projects/${id}`, {
        method: "PUT",
        json: { content: "v2" },
      });

      const r2 = await callApp(ctx.app, `/api/projects/${id}`);
      expect(((await r2.json()) as { content: string }).content).toBe("v2");

      await callApp(ctx.app, `/api/projects/${id}`, {
        method: "PUT",
        json: { content: "v3" },
      });

      const r3 = await callApp(ctx.app, `/api/projects/${id}`);
      expect(((await r3.json()) as { content: string }).content).toBe("v3");
    });
  });
});
