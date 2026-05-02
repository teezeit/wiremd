import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { defaultValidationHook } from "../middleware/error.js";
import type { AppEnv } from "../types.js";

const HealthSchema = z
  .object({
    ok: z.boolean(),
    time: z.string().openapi({ example: "2026-05-01T12:00:00.000Z" }),
  })
  .openapi("Health");

const healthRouteDef = createRoute({
  method: "get",
  path: "/",
  tags: ["Meta"],
  summary: "Liveness check",
  description: "Returns ok and the current server time. Use as a host probe.",
  responses: {
    200: {
      description: "Service is up",
      content: { "application/json": { schema: HealthSchema } },
    },
  },
});

export const healthRoute = new OpenAPIHono<AppEnv>({
  defaultHook: defaultValidationHook,
}).openapi(healthRouteDef, (c) => c.json({ ok: true, time: new Date().toISOString() }, 200));
