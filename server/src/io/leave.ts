/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

export default function leave(ws: WebSocket, event: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === event.room);
	let index = room.sockets.findIndex(
		(value: { socket: WebSocket; id: string }) => {
			return value.id === event.socketId;
		}
	);

	if (index >= 0) {
		room.sockets.splice(index, 1);
	}
}
