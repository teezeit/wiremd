import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { callApp, createTestContext, type TestContext } from "./helpers/setup.js";

const CONTENT = "# Hello\n\n[Save]*";

async function createProject(ctx: TestContext): Promise<string> {
  const res = await callApp(ctx.app, "/api/projects", {
    method: "POST",
    json: { content: CONTENT },
  });
  const { id } = await res.json() as { id: string };
  return id;
}

async function lock(
  ctx: TestContext,
  id: string,
  body: { clientId: string; name: string; force?: boolean },
): Promise<Response> {
  return callApp(ctx.app, `/api/projects/${id}/lock`, { method: "POST", json: body });
}

async function unlock(
  ctx: TestContext,
  id: string,
  clientId: string,
): Promise<Response> {
  return callApp(ctx.app, `/api/projects/${id}/lock`, {
    method: "DELETE",
    json: { clientId },
  });
}

describe("POST /api/projects/:id/lock", () => {
  let ctx: TestContext;

  beforeEach(async () => { ctx = await createTestContext(); });
  afterEach(async () => { await ctx.cleanup(); });

  it("acquires a free lock — returns 200", async () => {
    const id = await createProject(ctx);
    const res = await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    expect(res.status).toBe(200);
  });

  it("returns lockedName in response", async () => {
    const id = await createProject(ctx);
    const res = await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    const body = await res.json() as { lockedName: string };
    expect(body.lockedName).toBe("Blue Fox");
  });

  it("returns 409 when lock is held by someone else", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    const res = await lock(ctx, id, { clientId: "xyz", name: "Red Bear" });
    expect(res.status).toBe(409);
  });

  it("returns 200 when same client re-acquires own lock", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    const res = await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    expect(res.status).toBe(200);
  });

  it("steals a lock with force:true — returns 200", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    const res = await lock(ctx, id, { clientId: "xyz", name: "Red Bear", force: true });
    expect(res.status).toBe(200);
  });

  it("stolen lock is now held by the new client", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    await lock(ctx, id, { clientId: "xyz", name: "Red Bear", force: true });
    // Original holder can no longer re-acquire without force
    const res = await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    expect(res.status).toBe(409);
  });

  it("returns 404 for unknown project", async () => {
    const res = await lock(ctx, "nope", { clientId: "abc", name: "Blue Fox" });
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/projects/:id/lock", () => {
  let ctx: TestContext;

  beforeEach(async () => { ctx = await createTestContext(); });
  afterEach(async () => { await ctx.cleanup(); });

  it("releases own lock — returns 200", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    const res = await unlock(ctx, id, "abc");
    expect(res.status).toBe(200);
  });

  it("after release, another client can acquire the lock", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    await unlock(ctx, id, "abc");
    const res = await lock(ctx, id, { clientId: "xyz", name: "Red Bear" });
    expect(res.status).toBe(200);
  });

  it("ignores release from non-owner — returns 200 (idempotent)", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    const res = await unlock(ctx, id, "xyz");
    expect(res.status).toBe(200);
    // Lock still held by original owner
    const res2 = await lock(ctx, id, { clientId: "xyz", name: "Red Bear" });
    expect(res2.status).toBe(409);
  });

  it("force:true clears the lock regardless of who holds it", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    const res = await callApp(ctx.app, `/api/projects/${id}/lock`, {
      method: "DELETE",
      json: { clientId: "xyz", force: true },
    });
    expect(res.status).toBe(200);
    // Lock is now free — anyone can acquire
    const res2 = await lock(ctx, id, { clientId: "xyz", name: "Red Bear" });
    expect(res2.status).toBe(200);
  });
});

describe("GET /api/projects/:id — lock info", () => {
  let ctx: TestContext;

  beforeEach(async () => { ctx = await createTestContext(); });
  afterEach(async () => { await ctx.cleanup(); });

  it("includes null lock fields when unlocked", async () => {
    const id = await createProject(ctx);
    const res = await callApp(ctx.app, `/api/projects/${id}`);
    const body = await res.json() as Record<string, unknown>;
    expect(body.lockedBy).toBeNull();
    expect(body.lockedName).toBeNull();
  });

  it("includes lock info when locked", async () => {
    const id = await createProject(ctx);
    await lock(ctx, id, { clientId: "abc", name: "Blue Fox" });
    const res = await callApp(ctx.app, `/api/projects/${id}`);
    const body = await res.json() as Record<string, unknown>;
    expect(body.lockedBy).toBe("abc");
    expect(body.lockedName).toBe("Blue Fox");
  });

  it("includes lastEditorName and updatedAt", async () => {
    const id = await createProject(ctx);
    const res = await callApp(ctx.app, `/api/projects/${id}`);
    const body = await res.json() as Record<string, unknown>;
    expect(body).toHaveProperty("updatedAt");
    expect(body).toHaveProperty("lastEditorName");
  });
});
