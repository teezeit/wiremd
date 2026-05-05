import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { secureHeaders } from "hono/secure-headers";
import { bodyLimit } from "hono/body-limit";

import { corsMiddleware } from "./middleware/cors.js";
import {
  defaultValidationHook,
  onError,
  onNotFound,
} from "./middleware/error.js";
import { healthRoute } from "./routes/health.js";
import { projectsRoute } from "./routes/projects.js";
import { renderRoute_ } from "./routes/render.js";
import type { Db } from "./db/client.js";
import type { AppEnv } from "./types.js";

const MAX_BODY_BYTES = 1_100_000;

export function createApp(db: Db) {
  const app = new OpenAPIHono<AppEnv>({ defaultHook: defaultValidationHook });

  app
    .use("*", async (c, next) => {
      c.set("db", db);
      await next();
    })
    .use("*", secureHeaders({ referrerPolicy: "no-referrer" }))
    .use("*", corsMiddleware)
    .use(
      "/api/projects/*",
      bodyLimit({
        maxSize: MAX_BODY_BYTES,
        onError: (c) => c.json({ error: "Payload too large" }, 413),
      }),
    )
    .use(
      "/api/render/*",
      bodyLimit({
        maxSize: MAX_BODY_BYTES,
        onError: (c) => c.json({ error: "Payload too large" }, 413),
      }),
    );

  app.route("/api/health", healthRoute);
  app.route("/api/projects", projectsRoute);
  app.route("/api/render", renderRoute_);

  app.doc("/api/openapi.json", {
    openapi: "3.0.0",
    info: {
      title: "wiremd API",
      version: "0.0.1",
      description:
        "Collaboration API for wiremd. Persistent projects shareable via /p/:projectId. POC: no auth, security by obscurity (unguessable nanoid project IDs).",
    },
    tags: [
      {
        name: "Projects",
        description: "Create, read, update wiremd projects.",
      },
      { name: "Meta", description: "Health check and operational endpoints." },
      { name: "Render", description: "Render wiremd markdown to HTML." },
    ],
  });

  app.get("/api/docs", swaggerUI({ url: "/api/openapi.json" }));

  app.onError(onError);
  app.notFound(onNotFound);

  return app;
}

export type AppType = ReturnType<typeof createApp>;
