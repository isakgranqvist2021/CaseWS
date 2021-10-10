/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

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

export default function send(ws: WebSocket, event: any, b?: boolean) {
	let room = rooms.find((r: IRoom) => r.id === event.payload.room);

	return broadcast(
		room.sockets.map((s: any) => s.socket),
		b,
		{ ...event.payload, createdAt: new Date() },
		ws
	);
}
