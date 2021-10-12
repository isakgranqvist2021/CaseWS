/** @format */

import { createStore } from 'redux';

interface State {
	user: IUser;
	room: string;
}

export default createStore((state: State | null = null, action: IAction) => {
	switch (action.type) {
		case 'add':
			return (state = action.payload);
		default:
			return state;
	}
});
