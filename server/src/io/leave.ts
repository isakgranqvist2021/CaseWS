/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

export default function leave(ws: WebSocket, event: any, b?: boolean) {
	console.log(event);
}
