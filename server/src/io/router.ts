/** @format */

import WebSocket from 'ws';

import join from '../io/join';
import leave from '../io/leave';
import send from '../io/send';

export default function io(ws: WebSocket) {
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
}
