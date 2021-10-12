/** @format */

import WebSocket from 'ws';
import { rooms } from './rooms';
import { IRoom } from 'types';

export default function join(ws: WebSocket, payload: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === payload.room);

	if (!room)
		return rooms.push({
			id: payload.room,
			sockets: [{ socket: ws, id: payload.socketId }],
		});

	return room.sockets.push({
		socket: ws,
		id: payload.socketId,
	});
}
