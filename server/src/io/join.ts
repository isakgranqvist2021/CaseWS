/** @format */

import { IRoom } from 'types';
import WebSocket from 'ws';
import { rooms, sockets } from './store';

export default function join(ws: WebSocket, payload: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === payload.room);

	!room
		? rooms.push({
				id: payload.room,
				connections: [payload.socketId],
		  })
		: room.connections.push(payload.socketId);

	return sockets.push({ id: payload.socketId, socket: ws });
}
