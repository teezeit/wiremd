import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { parse, renderToHTML } from "@eclectic-ai/wiremd";

import { defaultValidationHook } from "../middleware/error.js";
import type { AppEnv } from "../types.js";

const MAX_FILE_BYTES = 1_048_576;

const StyleEnum = z
  .enum(["sketch", "clean", "wireframe", "none", "tailwind", "material", "brutal"])
  .default("sketch");

const FileEntry = z
  .object({
    name: z.string().min(1).openapi({ example: "index.md" }),
    content: z.string().max(MAX_FILE_BYTES).openapi({ example: "# Hello\n[Button]*" }),
  })
  .openapi("FileEntry");

const RenderBody = z
  .object({
    files: z.array(FileEntry).min(1).openapi({
      description: "Markdown files to render. First file is used as the entry point.",
    }),
    style: StyleEnum.openapi({ description: "Visual theme", example: "clean" }),
  })
  .openapi("RenderBody");

const ErrorResponse = z.object({ error: z.string() }).openapi("RenderError");

const renderRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Render"],
  summary: "Render markdown to HTML",
  description:
    "Accepts one or more markdown files and returns a single self-contained HTML file. " +
    "The first file in the array is used as the entry point. " +
    "Additional files are available for include resolution.",
  request: {
    body: {
      required: true,
      content: { "application/json": { schema: RenderBody } },
    },
  },
  responses: {
    200: {
      description: "Rendered HTML",
      content: { "text/html": { schema: z.string() } },
    },
    400: {
      description: "Validation error or parse failure",
      content: { "application/json": { schema: ErrorResponse } },
    },
    413: {
      description: "Payload too large",
      content: { "application/json": { schema: ErrorResponse } },
    },
  },
});

export const renderRoute_ = new OpenAPIHono<AppEnv>({
  defaultHook: defaultValidationHook,
}).openapi(renderRoute, (c) => {
  const { files, style } = c.req.valid("json");

  const entry = files[0]!;

  let ast;
  try {
    ast = parse(entry.content);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Parse error";
    return c.json({ error: message }, 400);
  }

  const html = renderToHTML(ast, { style, inlineStyles: true });
  return c.text(html, 200, { "Content-Type": "text/html; charset=utf-8" });
});
