/** @format */

import WebSocket from 'ws';
import { IRoom, ISocket, IMessage } from 'types';
import { rooms, sockets } from './store';
import broadcast from './broadcast';
import chat from '../models/chat';

export default async function join(ws: WebSocket, payload: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === payload.room);

	if (!room)
		rooms.push({
			id: payload.room,
			connections: [payload.socketId],
		});

	if (room) room.connections.push(payload.socketId);

	let socket = sockets.find((v: ISocket) => v.id === payload.socketId);

	if (!socket) sockets.push({ id: payload.socketId, socket: ws });
	if (socket) socket.socket = ws;

	let message: IMessage = {
		message: `${payload.user.nickname} has joined the room`,
		createdAt: new Date(),
		user: payload.user,
		type: 'event',
		eventType: 'join',
	};

	await chat.updateOne(
		{ _id: payload.room },
		{
			$push: { messages: message },
		}
	);

	if (!room) {
		room = rooms.find((room: IRoom) => room.id === payload.room);
		return broadcast(room, message);
	}

	return broadcast(room, message);
}
