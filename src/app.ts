import express, { Application } from 'express';
import { Model } from 'objection';
import Knex from 'knex';
import { routes } from './routes';
// Middleware
import { CorsMiddleware } from './middleware/Cors.middleware';
import { AppErrorHandlerMiddleware } from './middleware/AppErrorHandler.middleware';

// config
import { knexConfig } from './config/knex';

// create knex instance
const knex = Knex(knexConfig);
Model.knex(knex);

// Boot express
export const app: Application = express();

// CORS
app.use(CorsMiddleware);

// Express configuration
app.use(express.json());

// Application routing
routes(app);

// Application (global) error handling
app.use(AppErrorHandlerMiddleware);

// Application event handling
// import './events/index';
