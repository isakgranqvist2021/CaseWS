/** @format */

import WebSocket from 'ws';

export default function broadcast(
	clients: WebSocket[],
	payload: any,
	b?: boolean
) {
	return clients.forEach((client: WebSocket) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(payload, {
				binary: b,
			});
		}
	});
}
