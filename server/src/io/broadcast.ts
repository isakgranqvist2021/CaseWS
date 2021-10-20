/** @format */

import WebSocket from 'ws';
import { IMessage, ISocket, IRoom } from 'types';
import { sockets } from './store';

export default function broadcast(room: IRoom, payload: IMessage, b?: boolean) {
	const clients = sockets
		.filter((v: ISocket) => room.connections.includes(v.id))
		.map((v: ISocket) => v.socket);

	return clients.forEach((client: WebSocket) => {
		if (client.readyState === WebSocket.OPEN)
			client.send(JSON.stringify(payload), { binary: b });
	});
}
