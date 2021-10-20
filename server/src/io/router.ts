/** @format */

import WebSocket from 'ws';
import join from './join';
import leave from './leave';
import send from './send';
import occurance from './occurance';

export default function io(ws: WebSocket) {
	ws.on('message', (e: any, isBinary: boolean) => {
		const payload: any = JSON.parse(e);

		switch (payload.type) {
			case 'join':
				return join(ws, payload, isBinary);
			case 'message':
				return send(ws, payload, isBinary);
			case 'leave':
				return leave(ws, payload, isBinary);
			case 'occurance':
				return occurance(ws, payload, isBinary);
			default:
				return;
		}
	});
}
