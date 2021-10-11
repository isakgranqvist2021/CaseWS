/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

export default function join(ws: WebSocket, event: any, b?: boolean) {
	console.log(event);
}
