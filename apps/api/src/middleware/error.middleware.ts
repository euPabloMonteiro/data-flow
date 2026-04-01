import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ValidateError } from "@tsoa/runtime";
import { createLogger } from "@dataflow/logger";

const logger = createLogger("error-handler");

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    logger.warn(
      { statusCode: err.statusCode, path: req.path, method: req.method },
      err.message,
    );
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  if (err instanceof ValidateError) {
    logger.warn(
      { statusCode: 422, path: req.path, method: req.method },
      err.message,
    );
    return res.status(422).json({
      error: "Validation Failed",
      details: err.fields,
    });
  }

  if ("status" in err && typeof err.status === "number") {
    logger.warn(
      { statusCode: err.status, path: req.path, method: req.method },
      err.message,
    );
    return res.status(err.status).json({
      error: err.message,
    });
  }

  logger.error(
    { err, path: req.path, method: req.method },
    "Unhandled error",
  );

  return res.status(500).json({
    error: "Internal Server Error.",
  });
}
