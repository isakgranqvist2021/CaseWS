/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

export default function leave(ws: WebSocket, event: any, b?: boolean) {
	let index = rooms.findIndex((room: IRoom) => room.id === event.room);

	if (index >= 0) {
		rooms.splice(index, 1);
	}
}
