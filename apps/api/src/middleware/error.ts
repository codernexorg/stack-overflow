import { ErrorHandler } from "@helpers";
import { NextFunction, Request, Response } from "express";

export const error = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const msg = err.message || "Unexpected error";
  const status = err.statusCode || 500;

  res.status(status).json({
    message: msg,
  });
};
