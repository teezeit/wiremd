import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { createTestContext, type TestContext } from "./helpers/setup.js";

describe("CORS", () => {
  let ctx: TestContext;
  const originalCorsAllowedOrigins = process.env.CORS_ALLOWED_ORIGINS;

  beforeEach(async () => {
    ctx = await createTestContext();
    process.env.CORS_ALLOWED_ORIGINS =
      "http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176";
  });

  afterEach(async () => {
    if (originalCorsAllowedOrigins === undefined) {
      delete process.env.CORS_ALLOWED_ORIGINS;
    } else {
      process.env.CORS_ALLOWED_ORIGINS = originalCorsAllowedOrigins;
    }
    await ctx.cleanup();
  });

  it("allows local editor origins from CORS_ALLOWED_ORIGINS", async () => {
    const res = await ctx.app.request("/api/projects", {
      method: "OPTIONS",
      headers: {
        origin: "http://localhost:5174",
        "access-control-request-method": "POST",
        "access-control-request-headers": "content-type",
      },
    });

    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-origin")).toBe(
      "http://localhost:5174",
    );
    expect(res.headers.get("access-control-allow-methods")).toContain("POST");
    expect(res.headers.get("access-control-allow-headers")?.toLowerCase()).toContain(
      "content-type",
    );
  });

  it("allows production editor origins from CORS_ALLOWED_ORIGINS", async () => {
    process.env.CORS_ALLOWED_ORIGINS =
      "https://tobiashoelzer.com, https://www.tobiashoelzer.com";

    const res = await ctx.app.request("/api/projects", {
      method: "OPTIONS",
      headers: {
        origin: "https://tobiashoelzer.com",
        "access-control-request-method": "POST",
        "access-control-request-headers": "content-type",
      },
    });

    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-origin")).toBe(
      "https://tobiashoelzer.com",
    );
  });
});
