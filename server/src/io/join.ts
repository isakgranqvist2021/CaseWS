/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

export default function join(ws: WebSocket, event: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === event.room);

	if (!room) {
		rooms.push({
			id: event.room,
			sockets: [{ socket: ws, id: event.socketId }],
		});
	} else {
		room.sockets.push({
			socket: ws,
			id: event.socketId,
		});
	}
}
