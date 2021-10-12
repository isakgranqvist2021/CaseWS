/** @format */

import WebSocket from 'ws';
import join from '../io/join';
import leave from '../io/leave';
import send from '../io/send';
import { sockets } from './store';

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
			default:
				return;
		}
	});
}
