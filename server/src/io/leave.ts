/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

export default function leave(ws: WebSocket, event: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === event.payload.room);
	if (!room) return;

	console.log('leave', room);

	let index = room.sockets.findIndex(
		(socket: any) => socket === event.payload.socket
	);

	return room.sockets.splice(index, 1);
}
