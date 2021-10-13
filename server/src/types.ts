/** @format */

import WebSocket from 'ws';

export interface IMessage {
	message: string;
	createdAt: Date | string;
	user: any;
	type: 'message' | 'event' | 'file';
	eventType?: string;
	files?: any[];
}

export interface IRoom {
	id: string;
	connections: string[];
}

export interface ISocket {
	socket: WebSocket;
	id: string;
}
