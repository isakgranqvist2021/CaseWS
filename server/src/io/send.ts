/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';
import chat from '../models/chat';

function broadcast(clients: WebSocket[], payload: any, b?: boolean) {
	clients.forEach((client: WebSocket) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(payload, { binary: b });
		}
	});
}

export default async function send(ws: WebSocket, event: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === event.room);
	if (!room) return;

	let clients = room.sockets.map((s: { socket: WebSocket; id: string }) => {
		return s.socket;
	});

	let message = {
		message: event.message,
		createdAt: new Date(),
		user: event.user,
	};

	await chat.updateOne(
		{ _id: room.id },
		{
			$push: { messages: message },
		}
	);

	broadcast(clients, JSON.stringify(message));
}
