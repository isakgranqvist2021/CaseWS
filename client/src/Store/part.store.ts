/** @format */

import { createStore } from '@reduxjs/toolkit';

const updatePart = (
	state: IParticipant[],
	update: { sub: string; newState: boolean }
) => {
	let newState = state;
	let comparefn = (u: IParticipant) => u.sub && u.sub === update.sub;
	let part = newState.find(comparefn);
	if (!part) return state;

	part.isTyping = update.newState;
	return newState;
};

export default createStore((state: IParticipant[] = [], action: IAction) => {
	switch (action.type) {
		case 'update':
			return updatePart(state, action.payload);

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
