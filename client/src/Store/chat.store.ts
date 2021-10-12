/** @format */

import { createStore } from 'redux';

interface State {
	type: string;
	chat: IChat;
	room1: string;
	room2: string;
}

const mutations = ['join', 'leave', 'switch'];

export default createStore((state: State | null = null, action: IAction) => {
	const mutate = mutations.includes(action.type);

	if (mutate)
		return (state = {
			type: action.type,
			...action.payload,
		});

	return state;
});
