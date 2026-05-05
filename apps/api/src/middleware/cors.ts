import { cors } from "hono/cors";

function allowedOrigins(): string[] {
  return (process.env.CORS_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const corsMiddleware = cors({
  origin: (origin) => {
    if (!origin) return undefined;
    if (allowedOrigins().includes(origin)) return origin;
    if (process.env.ALLOW_ALL_ORIGINS === "1") return origin;
    return undefined;
  },
  allowMethods: ["GET", "POST", "PUT", "HEAD", "OPTIONS"],
  allowHeaders: ["Content-Type", "X-Wmd-Session"],
  maxAge: 86400,
});
