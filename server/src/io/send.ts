/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

function broadcast(clients: WebSocket[], payload: any, b?: boolean) {
	clients.forEach((client: WebSocket) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(payload, { binary: b });
		}
	});
}

export default function send(ws: WebSocket, event: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === event.room);

	let clients = room.sockets.map((s: { socket: WebSocket; id: string }) => {
		return s.socket;
	});

	broadcast(clients, JSON.stringify({ message: event.message }));
}
