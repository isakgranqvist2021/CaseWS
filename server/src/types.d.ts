/** @format */

interface IRoom {
	id: string;
	sockets: ISocket[];
}

interface IMessage {
	message: string;
	createdAt: Date | string;
	user: any;
	type: 'message' | 'event';
}

interface ISocket {
	socket: import('ws').WebSocket;
	id: string;
}
