/** @format */

import { createStore } from 'redux';

export default createStore((state: IAction | null = null, action: IAction) => {
	switch (action.type) {
		case 'join':
			return (state = action);
		case 'leave':
			return (state = action);
		case 'switch':
			return (state = action);
		default:
			return state;
	}
});
