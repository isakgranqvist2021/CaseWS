/** @format */

import { createStore } from '@reduxjs/toolkit';

export default createStore((state: IParticipant[] = [], action: IAction) => {
	console.log(action.payload);

	switch (action.type) {
		case 'update':
			return;

		case 'set':
			return action.payload;

		default:
			return state;
	}
});
