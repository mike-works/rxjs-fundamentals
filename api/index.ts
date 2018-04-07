import * as express from 'express';
import apiRouter from './api-router';

export function setupRoutes(app: express.Application) {
  app.use('/api', apiRouter);
}
