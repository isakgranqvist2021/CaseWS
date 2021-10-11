/** @format */

import { type } from 'os';
import { createStore } from 'redux';

interface Payload {
	type: string;
	chat: IChat;
	room1: string;
	room2: string;
}

export default createStore((state: Payload | null = null, action: IAction) => {
	switch (action.type) {
		case 'join':
			return (state = { type: action.type, ...action.payload });
		case 'leave':
			return (state = { type: action.type, ...action.payload });
		case 'switch':
			return (state = { type: action.type, ...action.payload });
		default:
			return state;
	}
});
