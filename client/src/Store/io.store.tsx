/** @format */

import { createStore } from 'redux';

export default createStore(
	(
		state: { socket: string; chat: string } | null = null,
		action: IAction
	) => {
		switch (action.type) {
			case 'leave':
				return (state = action.payload);
			default:
				return state;
		}
	}
);
