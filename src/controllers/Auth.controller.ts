import { NextFunction, Request, Response, Router } from 'express';
import { AuthService } from '../services/Auth.service';

export const RegisterController = Router();
export const LoginController = Router();

RegisterController.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body.input.payload;

      const result = await AuthService.register(data);

      console.log(result);

      res.status(result.httpCode).send(result.data);
    } catch (err) {
      console.log(err);

      next(err);
    }
  },
);

LoginController.post(
  '/',

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body.input.payload;

      console.log(username, password);

      const result = await AuthService.login({ username, password });

      res.status(result.httpCode).send(result.data);
    } catch (err) {
      next(err);
    }
  },
);
