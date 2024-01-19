import { Application, Router } from 'express';
import {
  LoginController,
  RegisterController,
} from './controllers/Auth.controller';

const _routes: [string, Router][] = [
  ['/register', RegisterController],
  ['/login', LoginController],
];

export const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
