import * as express from 'express';
import * as http from 'http';
import * as io from 'socket.io';
import apiRouter from './api-router';
export function setupRoutes(app: express.Application) {
  const wsServer = http.createServer();
  const ioServer = io(wsServer);
  wsServer.listen(8090);

  ioServer.on('connection', socket => {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', data => {
      console.log(data);
    });
  });
  app.use('/api', apiRouter(app));
}
