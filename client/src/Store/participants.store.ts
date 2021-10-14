/** @format */

import { createStore } from '@reduxjs/toolkit';

interface State {
	user: IUser;
	room: string;
}

export default createStore((state: State | null = null, action: IAction) => {
	if (action.type === 'add') return (state = action.payload);
	return state;
});
