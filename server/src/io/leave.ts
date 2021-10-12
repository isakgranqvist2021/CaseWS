/** @format */

import { rooms } from './rooms';
import WebSocket from 'ws';

export default function leave(ws: WebSocket, payload: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === payload.room);

	let index = room.sockets.findIndex(
		(value: { socket: WebSocket; id: string }) => {
			return value.id === payload.socketId;
		}
	);

	if (index >= 0) room.sockets.splice(index, 1);
	if (room.sockets.length === 0)
		rooms.splice(
			rooms.findIndex((r: IRoom) => r.id === payload.room),
			1
		);

	return;
}
