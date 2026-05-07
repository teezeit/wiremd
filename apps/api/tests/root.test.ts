import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { callApp, createTestContext, type TestContext } from "./helpers/setup.js";

describe("GET / and /api", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await createTestContext();
  });
  afterEach(async () => {
    await ctx.cleanup();
  });

  it("/ redirects to /api/docs", async () => {
    const res = await callApp(ctx.app, "/");
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("/api/docs");
  });

  it("/api redirects to /api/docs", async () => {
    const res = await callApp(ctx.app, "/api");
    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("/api/docs");
  });
});
