/** @format */

import { app, server, wss } from './utils/io';
import WebSocket from 'ws';
import express from 'express';
import cors from 'cors';
import connect from './utils/database';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
	path: path.resolve('./src/.env'), // remove this line in production
	debug: true, // remove this line in production
});
connect();

const PORT = process.env.PORT || 8080;

import router from './router';
import join from './io/join';
import leave from './io/leave';
import send from './io/send';

app.use(express.json());
app.use(cors());
app.use('/chat', router);

wss.on('connection', (ws: WebSocket) => {
	ws.on('message', (e: any, isBinary: boolean) => {
		const event: any = JSON.parse(e);

		switch (event.type) {
			case 'join':
				return join(ws, event, isBinary);
			case 'message':
				return send(ws, event, isBinary);
			case 'leave':
				return leave(ws, event, isBinary);
			default:
				return;
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`);
});
