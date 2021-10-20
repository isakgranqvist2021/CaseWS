/** @format */

import WebSocket from 'ws';
import broadcast from './broadcast';
import { IMessage, IRoom } from 'types';
import { rooms } from './store';

export default function occurance(ws: WebSocket, payload: any, b?: boolean) {
	const room = rooms.find((r: IRoom) => r.id === payload.room);
	if (!room) return;

	const message: IMessage = {
		message: '',
		createdAt: new Date(),
		type: payload.type,
		reason: payload.reason,
		user: null,
		sub: payload.sub,
		newState: payload.newState,
	};

	return broadcast(room, message, b);
}
