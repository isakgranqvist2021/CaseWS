/** @format */

import WebSocket from 'ws';
import { IRoom, ISocket, IMessage } from 'types';
import { rooms, sockets } from './store';
import broadcast from './broadcast';
import chat from '../models/chat';

export default async function leave(ws: WebSocket, payload: any, b?: boolean) {
	let room = rooms.find((room: IRoom) => room.id === payload.room);
	if (!room) return;

	let index = room.connections.findIndex(
		(id: string) => id === payload.socketId
	);

	if (index >= 0) {
		room.connections.splice(index, 1);
	}

	if (room.connections.length === 0) {
		index = rooms.findIndex((room: IRoom) => room.id === payload.room);
		rooms.splice(index, 1);
	}

	let socket = sockets.find((v: ISocket) => v.id === payload.socketId);
	if (socket) socket.socket = ws;

	let message: IMessage = {
		message: `${payload.user.nickname} has left the room`,
		createdAt: new Date(),
		user: payload.user,
		type: 'event',
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
