/** @format */

import { rooms, IRoom } from './rooms';
import WebSocket from 'ws';

export default function join(ws: WebSocket, event: any, b?: boolean) {
	let room = rooms.find((r: IRoom) => r.id === event.payload.room);

	if (room)
		return room.sockets.push({
			socket: ws,
			id: event.id,
		});

	return rooms.push({
		id: event.payload.room,
		sockets: [
			{
				socket: ws,
				id: event.payload.user.sub,
			},
		],
	});
}
