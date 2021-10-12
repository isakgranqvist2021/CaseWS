/** @format */

import { IRoom, IMessage, ISocket } from 'types';

import WebSocket from 'ws';
export default function broadcast(room: IRoom, payload: IMessage, b?: boolean) {
	let clients: WebSocket[] = room.sockets.map((s: ISocket) => s.socket);

	return clients.forEach((client: WebSocket) => {
		if (client.readyState === WebSocket.OPEN)
			client.send(payload, { binary: b });
	});
}
