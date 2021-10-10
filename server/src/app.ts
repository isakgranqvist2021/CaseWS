/** @format */

import { Server } from 'http';
import WebSocket, { WebSocketServer } from 'ws';

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
const app = express();
const server = new Server(app);

import router from './router';

app.use(express.json());
app.use(cors());
app.use('/chat', router);

const wss = new WebSocketServer({
	server: server,
});

interface IRoom {
	id: string;
	sockets: { socket: WebSocket; id: string }[];
}

const rooms: IRoom[] = [];

function broadcast(
	clients: WebSocket[],
	isBinary: boolean,
	payload: any,
	ws: WebSocket
) {
	clients.forEach((client: any) => {
		if (client !== ws && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(payload), { binary: isBinary });
		}
	});
}

wss.on('connection', (ws: WebSocket) => {
	let room: IRoom;
	console.log(rooms);

	ws.on('message', (payload: any, isBinary: boolean) => {
		const incomingEvent: { type: string; payload: any } =
			JSON.parse(payload);

		switch (incomingEvent.type) {
			case 'join':
				room = rooms.find(
					(r: IRoom) => r.id === incomingEvent.payload.room
				);

				if (room)
					return room.sockets.push({
						socket: ws,
						id: incomingEvent.payload.user.sub,
					});

				return rooms.push({
					id: incomingEvent.payload.room,
					sockets: [
						{
							socket: ws,
							id: incomingEvent.payload.user.sub,
						},
					],
				});

			case 'message':
				room = rooms.find(
					(r: IRoom) => r.id === incomingEvent.payload.room
				);

				return broadcast(
					room.sockets.map((s: any) => s.socket),
					isBinary,
					{ ...incomingEvent.payload, createdAt: new Date() },
					ws
				);

			case 'leave':
				console.log('leave');
				console.log(incomingEvent);

				room = rooms.find(
					(room: IRoom) => room.id === incomingEvent.payload.room
				);
				if (!room) return;

				console.log('leave', room);

				let index = room.sockets.findIndex(
					(socket: any) => socket === incomingEvent.payload.socket
				);

				return room.sockets.splice(index, 1);
			default:
				return;
		}
	});
});

server.listen(PORT, () => {
	console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`);
});
