import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const zodMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await schema.parseAsync(data);
      next();
    } catch (error) {
      next(error);
    }
  };
};
