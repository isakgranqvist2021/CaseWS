/** @format */

import { useState, useEffect } from 'react';

import styled from 'styled-components';

import FormComponent from 'Components/Containers/FormComponent';
import ChatComponent from 'Components/Containers/ChatComponent';
import LoadingComponent from 'Components/Feedback/LoadingComponent';
import settings from 'Utils/settings';
import chatStore from 'Store/chat.store';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100vh;
`;

export default function ContentComponent(props: IUser) {
	const ws: WebSocket = new WebSocket(settings.ws);
	const [chat, setChat] = useState<IChat | null>(null);

	const join = (room: string): void => {
		return ws.send(
			JSON.stringify({
				type: 'join',
				room: room,
				socketId: props.sub,
			})
		);
	};

	const leave = (room: string): void => {
		return ws.send(
			JSON.stringify({
				type: 'leave',
				room: room,
				socketId: props.sub,
			})
		);
	};

	const leave_join = (room: string): void => {
		console.log(chat);

		if (chat) leave(chat._id);
		return join(room);
	};

	useEffect(() => {
		chatStore.subscribe(() => {
			let ns = chatStore.getState();
			if (!ns) return;

			if (ns.type === 'join') join(ns.payload._id);
			if (ns.type === 'leave') leave(ns.payload._id);
			if (ns.type === 'switch') leave_join(ns.payload._id);

			return setChat(ns.payload);
		});
	}, []);

	if (!chat)
		return <LoadingComponent reason='Please join a chat' loader={false} />;

	return (
		<Content>
			<ChatComponent messages={chat.messages} socket={ws} />
			<FormComponent room={chat._id} socketId={props.sub} socket={ws} />
		</Content>
	);
}
