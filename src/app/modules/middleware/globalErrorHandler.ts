import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const globalError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  let message = err.message;

  if (err instanceof ZodError) {
    message = err.issues[0].message;
  }

  res.status(statusCode).json({
    success: false,
    message: message || "Something want wrong",
    err: err,
  });
};
