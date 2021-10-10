/** @format */

import WebSocket from 'ws';

export interface IRoom {
	id: string;
	sockets: { socket: WebSocket; id: string }[];
}

export const rooms: IRoom[] = [];
