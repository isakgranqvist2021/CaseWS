/** @format */

import { IRoom } from 'types';
import WebSocket from 'ws';
import { rooms } from './store';

export default function leave(ws: WebSocket, payload: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === payload.room);
	if (!room) return;

	let index = room.connections.findIndex(
		(id: string) => id === payload.socketId
	);

	room.connections.splice(index, 1);

	if (room.connections.length === 0) {
		index = rooms.findIndex((room: IRoom) => room.id === payload.room);
		rooms.splice(index, 1);
	}

	return;
}
