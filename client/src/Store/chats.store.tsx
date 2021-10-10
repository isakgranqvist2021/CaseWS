/** @format */

import { createStore } from 'redux';

export default createStore((state: IChat | null = null, action: IAction) => {
	switch (action.type) {
		case 'new':
			return (state = action.payload);
		default:
			return state;
	}
});
