import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validateBody = <T>(
  schema: ZodType<T>,
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.issues,
      });
      return;
    }

    req.body = result.data;
    next();
  };
};

export const validateParams = <T>(
  schema: ZodType<T>,
): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Invalid parameters",
        errors: result.error.issues,
      });
      return;
    }

    req.params = result.data as typeof req.params;
    next();
  };
};
