/** @format */

import { createStore } from '@reduxjs/toolkit';

export default createStore((state: IParticipant[] = [], action: IAction) => {
	switch (action.type) {
		case 'update':
			return state;

		case 'add user':
			return [...state, action.payload];

		case 'set':
			return action.payload;

		case 'get state':
			return state;

		default:
			return state;
	}
});
