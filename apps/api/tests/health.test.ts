import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { callApp, createTestContext, type TestContext } from "./helpers/setup.js";

describe("GET /api/health", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await createTestContext();
  });
  afterEach(async () => {
    await ctx.cleanup();
  });

  it("returns 200 with ok and a current timestamp", async () => {
    const res = await callApp(ctx.app, "/api/health");
    expect(res.status).toBe(200);

    const body = (await res.json()) as { ok: boolean; time: string };
    expect(body.ok).toBe(true);
    expect(() => new Date(body.time).toISOString()).not.toThrow();
    expect(Math.abs(Date.now() - new Date(body.time).getTime())).toBeLessThan(5_000);
  });
});
