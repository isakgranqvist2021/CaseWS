/** @format */

import express, { Application } from 'express';
import { Server } from 'http';
import { WebSocketServer } from 'ws';

export const app: Application = express();
export const server: Server = new Server(app);
export const wss: WebSocketServer = new WebSocketServer({
	server: server,
});
