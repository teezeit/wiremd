import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { callApp, createTestContext, type TestContext } from "./helpers/setup.js";

const MD = "# Hello\n\n[Save]*";

async function render(
  ctx: TestContext,
  body: unknown,
): Promise<Response> {
  return callApp(ctx.app, "/api/render", { method: "POST", json: body });
}

describe("POST /api/render", () => {
  let ctx: TestContext;

  beforeEach(async () => {
    ctx = await createTestContext();
  });
  afterEach(async () => {
    await ctx.cleanup();
  });

  it("returns 200 text/html for valid input", async () => {
    const res = await render(ctx, { files: [{ name: "index.md", content: MD }] });
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toContain("text/html");
  });

  it("returns a self-contained HTML document", async () => {
    const res = await render(ctx, { files: [{ name: "index.md", content: MD }] });
    const html = await res.text();
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain("<style>");
    expect(html).toContain("Hello");
  });

  it("applies the requested style", async () => {
    const sketch = await render(ctx, {
      files: [{ name: "index.md", content: MD }],
      style: "sketch",
    });
    const clean = await render(ctx, {
      files: [{ name: "index.md", content: MD }],
      style: "clean",
    });
    const sketchHtml = await sketch.text();
    const cleanHtml = await clean.text();
    expect(sketchHtml).not.toBe(cleanHtml);
  });

  it("defaults style to sketch when omitted", async () => {
    const withDefault = await render(ctx, { files: [{ name: "index.md", content: MD }] });
    const withSketch = await render(ctx, {
      files: [{ name: "index.md", content: MD }],
      style: "sketch",
    });
    expect(await withDefault.text()).toBe(await withSketch.text());
  });

  it("uses the first file as the entry point", async () => {
    const res = await render(ctx, {
      files: [
        { name: "index.md", content: "# Entry" },
        { name: "other.md", content: "# Other" },
      ],
    });
    const html = await res.text();
    expect(html).toContain("Entry");
    expect(html).not.toContain("Other");
  });

  it("returns 400 when files array is missing", async () => {
    const res = await render(ctx, { style: "clean" });
    expect(res.status).toBe(400);
  });

  it("returns 400 when files array is empty", async () => {
    const res = await render(ctx, { files: [] });
    expect(res.status).toBe(400);
  });

  it("returns 400 when a file entry has no name", async () => {
    const res = await render(ctx, { files: [{ content: MD }] });
    expect(res.status).toBe(400);
  });

  it("returns 400 when a file entry has no content", async () => {
    const res = await render(ctx, { files: [{ name: "index.md" }] });
    expect(res.status).toBe(400);
  });

  it("returns 400 for an invalid style value", async () => {
    const res = await render(ctx, {
      files: [{ name: "index.md", content: MD }],
      style: "not-a-style",
    });
    expect(res.status).toBe(400);
  });
});
