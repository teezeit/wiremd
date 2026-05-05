import { cors } from "hono/cors";

const DEFAULT_ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176", // editor-v2
];

function envAllowedOrigins(): string[] {
  return (process.env.CORS_ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export const corsMiddleware = cors({
  origin: (origin) => {
    if (!origin) return undefined;
    if (DEFAULT_ALLOWED_ORIGINS.includes(origin)) return origin;
    if (envAllowedOrigins().includes(origin)) return origin;
    if (process.env.ALLOW_ALL_ORIGINS === "1") return origin;
    return undefined;
  },
  allowMethods: ["GET", "POST", "PUT", "HEAD", "OPTIONS"],
  allowHeaders: ["Content-Type", "X-Wmd-Session"],
  maxAge: 86400,
});
