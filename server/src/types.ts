/** @format */

import WebSocket from 'ws';

export interface IMessage {
	message: string;
	createdAt: Date | string;
	user: any;
	type: 'message' | 'event' | 'file' | 'occurance';
	reason?: 'left' | string;
	eventType?: string;
	files?: any[];
	room?: string;
	newState?: any;
	sub?: string;
}

export interface IRoom {
	id: string;
	connections: string[];
}

export interface ISocket {
	socket: WebSocket;
	id: string;
}
