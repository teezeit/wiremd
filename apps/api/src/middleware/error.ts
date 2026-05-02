import type { Context, ErrorHandler, NotFoundHandler } from "hono";
import { HTTPException } from "hono/http-exception";

export const onError: ErrorHandler = (err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: err.message }, err.status);
  }
  console.error("[api] unhandled error:", err);
  return c.json({ error: "Internal server error" }, 500);
};

export const onNotFound: NotFoundHandler = (c) => c.json({ error: "Not found" }, 404);

export const defaultValidationHook = (
  result: { success: boolean },
  c: Context,
) => {
  if (!result.success) {
    return c.json({ error: "Validation error" }, 400);
  }
};
