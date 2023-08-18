import * as bcrypt from "bcryptjs";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { appDataSource } from "orm.config";
import { ObjectLiteral } from "typeorm";
import { z } from "zod";
import { ErrorMessageOptions, generateErrorMessage } from "zod-error";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, bcrypt.genSaltSync(10));
};

/**
 *
 * @param password Plaintext password
 * @param hased Hashed stored in the database
 * @returns boolean of password matching status
 */

export const isPasswordMatch = (password: string, hased: string) =>
  bcrypt.compareSync(password, hased);

export const requestHandler = <TQuery, TBody, TParams>(
  handler: (
    req: Request<TParams, any, TBody, TQuery> & { user?: any },
    res: Response,
    next: NextFunction
  ) => Promise<void> | void | any,
  config?: {
    params?: z.ZodSchema<TParams>;
    body?: z.ZodSchema<TBody>;
    query?: z.ZodSchema<TQuery>;
  }
) => {
  return (
    req: Request<TParams, any, TBody, TQuery> & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    const options: ErrorMessageOptions = {
      delimiter: {
        error: " 🔥 ",
      },
      transform: ({ errorMessage, index }) =>
        `Error #${index + 1}: ${errorMessage} `,
    };
    if (config?.body) {
      const result = config.body.safeParse(req.body);
      if (!result.success) {
        const err = generateErrorMessage(result.error.issues, options);
        return ApiError(err, 404, next);
      }
    }
    if (config?.query) {
      const result = config.query.safeParse(req.query);
      if (!result.success) {
        const err = generateErrorMessage(result.error.issues, options);
        return ApiError(err, 404, next);
      }
    }
    if (config?.params) {
      const result = config.params.safeParse(req.params);
      if (!result.success) {
        const err = generateErrorMessage(result.error.issues, options);
        return ApiError(err, 404, next);
      }
    }
    return Promise.resolve(handler(req, res, next));
  };
};

export abstract class Controller<T extends ObjectLiteral> {
  public repository;
  constructor(entity: any) {
    this.repository = appDataSource.getRepository<T>(entity);
  }
}

export class ErrorHandler extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    Error.captureStackTrace(this);
  }
}

/**
 *
 * @param message Error message
 * @param statusCode Error Status code
 * @param next Express Next Function
 * @returns Next Function
 */

export function ApiError(
  message: string,
  statusCode: number,
  next: NextFunction
) {
  return next(new ErrorHandler(message, statusCode));
}
