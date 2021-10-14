/** @format */

import { createStore } from 'redux';

interface State {
	event: string;
	payload: any;
}

export default createStore((state: State | null = null, action: IAction) => {
	if (action.type === 'set active') {
		return (state = { event: action.type, payload: action.payload });
	}

	if (action.type === 'remove user') {
		return (state = { event: action.type, payload: action.payload });
	}

	return (state = action.payload);
});
