/** @format */

import { createStore } from '@reduxjs/toolkit';

const removeUser = (state: IChat[], room: string, sub: string): IChat[] => {
	let newState = state;

	let i = newState.findIndex((c: IChat) => c._id === room);
	let j = newState[i].participants.findIndex((u: IUser) => u.sub === sub);
	newState[i].participants.splice(j, 1);

	if (newState[i].participants.length === 0) newState.splice(i, 1);

	return newState;
};

const addUser = (state: IChat[], room: string, user: IUser): IChat[] => {
	let newState = state;

	let i = newState.findIndex((c: IChat) => c._id === room);
	newState[i].participants.push(user);

	return newState;
};

export default createStore((state: IChat[] = [], action: IAction) => {
	switch (action.type) {
		case 'set':
			return action.payload;

		case 'remove user':
			return (state = removeUser(
				state,
				action.payload.room,
				action.payload.user
			));

		case 'add user':
			return addUser(state, action.payload.room, action.payload.user);

		case 'add one':
			return [...state, action.payload];

		default:
			return state;
	}
});
