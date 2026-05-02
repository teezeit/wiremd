import { cors } from "hono/cors";

const ALLOWED_ORIGINS = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:5175",
  "https://teezeit.github.io",
  "https://tobiashoelzer.com",
];

export const corsMiddleware = cors({
  origin: (origin) => {
    if (!origin) return undefined;
    if (ALLOWED_ORIGINS.includes(origin)) return origin;
    if (process.env.ALLOW_ALL_ORIGINS === "1") return origin;
    return undefined;
  },
  allowMethods: ["GET", "POST", "PUT", "HEAD", "OPTIONS"],
  allowHeaders: ["Content-Type", "X-Wmd-Session"],
  maxAge: 86400,
});
