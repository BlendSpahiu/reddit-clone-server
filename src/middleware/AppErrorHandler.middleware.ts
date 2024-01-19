import { NextFunction, Request, Response } from 'express';

export const AppErrorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message } = err;
  // @TODO parse errors

  // Send default error
  res.status(500).send({ error: { message } });
};
