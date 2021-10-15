/** @format */

import { createStore } from '@reduxjs/toolkit';

interface State {
	chat: IChat;
	prevConn: string | undefined;
	evType: string;
}

const setState = (state: State | null, payload: State): State => {
	let prevConn;

	if (!state || !state.chat) {
		prevConn = undefined;
	} else {
		prevConn = state.chat._id;
	}

	return {
		chat: payload.chat,
		prevConn: prevConn,
		evType: payload.evType,
	};
};

const addMessage = (
	state: State | null,
	payload: { message: IMessage; evType: string }
): State | null => {
	if (!state) return null;

	let newState = state;
	newState.chat.messages.push(payload.message);

	return {
		...newState,
		evType: payload.evType,
	};
};

export default createStore((state: State | null = null, action: IAction) => {
	switch (action.type) {
		case 'set':
			return setState(state, action.payload);

		case 'add message':
			return addMessage(state, action.payload);

		case 'remove':
			return (state = null);
	}
	return state;
});
