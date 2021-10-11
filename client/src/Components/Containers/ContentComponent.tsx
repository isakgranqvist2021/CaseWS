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

	useEffect(() => {
		ws.onopen = () => {
			console.log('WebSocket -> OPEN');
			ws.onmessage = (event: any) => {
				console.log(event);

				let data = JSON.parse(event.data);
				if (chat) {
					console.log('Append message to chat');

					let newMessage = {
						message: data.message,
						createdAt: new Date().toLocaleDateString(),
						user: {
							nickname: 'John',
						},
					};

					setChat({
						...chat,
						messages: [...chat.messages, newMessage],
					});
				}
			};
		};
	}, [chat]);

	useEffect(() => {
		chatStore.subscribe(() => {
			let ns = chatStore.getState();
			if (!ns) return;

			switch (ns.type) {
				case 'join':
					join(ns.room1);
					break;
				case 'leave':
					leave(ns.room2);
					break;
				case 'switch':
					leave(ns.room2);
					join(ns.room1);
					break;
			}

			return setChat(ns.chat);
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
