import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utils/responses.js";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof Error) {
    return errorResponse(res, 500, err.message);
  }

  return errorResponse(res, 500, "An unexpected Error Occurred");
};
