import type { Response, Request } from "express";
import { errorResponse } from "../utils/responses.js";
export const errorHandler = (err: unknown, _req: Request, res: Response) => {
  if (err instanceof Error) {
    return errorResponse(res, 500, err.message);
  } else {
    return errorResponse(res, 500, "An unexpected Error Occurred");
  }
};
