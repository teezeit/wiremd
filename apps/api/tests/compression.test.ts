import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { callApp, createTestContext, type TestContext } from "./helpers/setup.js";

describe("response compression", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await createTestContext();
  });
  afterEach(async () => {
    await ctx.cleanup();
  });

  it("gzip-compresses the response when the client sends Accept-Encoding: gzip", async () => {
    // Sizable content so compression has something material to do.
    const content = "# Big wireframe\n" + "lorem ipsum ".repeat(2000);

    const created = await callApp(ctx.app, "/api/projects", {
      method: "POST",
      json: { content },
    });
    const { id } = (await created.json()) as { id: string };

    const res = await callApp(ctx.app, `/api/projects/${id}`, {
      headers: { "accept-encoding": "gzip" },
    });

    expect(res.status).toBe(200);
    expect(res.headers.get("content-encoding")).toBe("gzip");

    // Gzip stream magic number: 0x1f 0x8b
    const buf = new Uint8Array(await res.arrayBuffer());
    expect(buf[0]).toBe(0x1f);
    expect(buf[1]).toBe(0x8b);
  });

  it("does not compress when the client does not advertise gzip support", async () => {
    const created = await callApp(ctx.app, "/api/projects", {
      method: "POST",
      json: { content: "# small" },
    });
    const { id } = (await created.json()) as { id: string };

    const res = await callApp(ctx.app, `/api/projects/${id}`);

    expect(res.status).toBe(200);
    expect(res.headers.get("content-encoding")).toBeNull();

    // Body is plain JSON.
    const body = (await res.json()) as { content: string };
    expect(body.content).toBe("# small");
  });
});
