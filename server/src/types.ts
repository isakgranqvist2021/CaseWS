/** @format */

import WebSocket from 'ws';

export interface IRoom {
	id: string;
	sockets: ISocket[];
}

export interface IMessage {
	message: string;
	createdAt: Date | string;
	user: any;
	type: 'message' | 'event';
}

export interface ISocket {
	socket: WebSocket;
	id: string;
}
