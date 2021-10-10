/** @format */

import { createStore } from 'redux';

export default createStore((state: IChat | null = null, action: IAction) => {
	switch (action.type) {
		case 'set':
			return (state = action.payload);
		case 'remove':
			return (state = null);
		default:
			return state;
	}
});
