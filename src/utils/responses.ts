import type { Response } from "express";

export const errorResponse = (res: Response, status: number, error: string) => {
  res.status(status).json({ success: false, error });
};

export const successResponse = (
  res: Response,
  status: number,
  data: unknown,
) => {
  if (typeof data === "function" || typeof data === "undefined") {
    errorResponse(res, 500, "Invaild Response Data");
  } else {
    res.status(status).json({ success: true, data });
  }
};
