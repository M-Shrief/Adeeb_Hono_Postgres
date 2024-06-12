import { HTTPException } from "hono/http-exception";
import { StatusCode } from "hono/utils/http-status";

export class AppError extends HTTPException {
  public readonly isOperational: boolean;

  constructor(
    status: StatusCode,
    options: HTTPExceptionOptions, // Should be HTTPExceptionOptions, but it's not exported
    isOperational: boolean,
  ) {
    super(status, options);

    this.isOperational = isOperational || false;

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    Error.captureStackTrace(this);
  }
}

/**
 * Options for creating an `HTTPException`.
 * @property res - Optional response object to use.
 * @property message - Optional custom error message.
 * @property cause - Optional cause of the error.
 */
type HTTPExceptionOptions = {
  res?: Response;
  message?: string;
  cause?: unknown;
};
