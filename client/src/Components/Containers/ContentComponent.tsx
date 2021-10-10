/** @format */

import { useState, useEffect } from 'react';

import chatStore from 'Store/chat.store';
import ioStore from 'Store/io.store';

import styled from 'styled-components';

import FormComponent from 'Components/Containers/FormComponent';
import ChatComponent from 'Components/Containers/ChatComponent';
import LoadingComponent from 'Components/Feedback/LoadingComponent';
import settings from 'Utils/settings';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100vh;
`;

export default function ContentComponent(props: IUser) {
	let ws = new WebSocket(settings.ws);

	const [chat, setChat] = useState<IChat | null>();

	const addMessage = (data: any) => {
		if (!chat) return;

		setChat({
			...chat,
			messages: [...chat.messages, data],
		});
	};

	const send = (message: string) => {
		addMessage({
			message,
			room: chat?._id,
			createdAt: new Date().toLocaleDateString(),
			user: props,
		});

		ws.send(
			JSON.stringify({
				type: 'message',
				payload: {
					message,
					user: props,
					room: chat?._id,
				},
			})
		);
	};

	useEffect(() => {
		chatStore.subscribe(() => setChat(chatStore.getState()));
	}, []);

	useEffect(() => {
		if (!chat) return;

		ws.onopen = () => {
			ioStore.subscribe(() => {
				let update = ioStore.getState();
				if (!update) return;

				let data = JSON.stringify({
					type: 'leave',
					payload: {
						room: chat?._id,
						socket: props.sub,
					},
				});

				ws.send(data);
			});

			let data = JSON.stringify({
				type: 'join',
				payload: {
					user: props,
					chat: chat,
					room: chat._id,
				},
			});

			ws.send(data);

			ws.onmessage = (payload: any) => {
				let data = JSON.parse(payload.data);
				addMessage(data);
			};
		};

		return () => ws.close();
	}, [chat]);

	if (!chat) return <LoadingComponent reason='Please join a chat' />;

	return (
		<Content>
			<ChatComponent {...chat} />
			<FormComponent {...props} send={send} />
		</Content>
	);
}
