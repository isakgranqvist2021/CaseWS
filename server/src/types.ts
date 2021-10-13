/** @format */

import WebSocket from 'ws';

export interface IMessage {
	message: string;
	createdAt: Date | string;
	user: any;
	type: 'message' | 'event';
	eventType?: string;
}

export interface IRoom {
	id: string;
	connections: string[];
}

export interface ISocket {
	socket: WebSocket;
	id: string;
}
