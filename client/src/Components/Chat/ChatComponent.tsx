/** @format */

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import ChatFormComponent from 'Components/Chat/ChatFormComponent';
import ChatMessageComponent from 'Components/Chat/ChatMessageComponent';
import ChatHeaderComponent from 'Components/Chat/ChatHeaderComponent';
import NoChatComponent from 'Components/Chat/NoChatComponent';
import settings from 'Utils/settings';
import chatStore from 'Store/chat.store';

const Content = styled.div`
	width: 100%;
	height: 100vh;
`;

const Chat = styled.div`
	background-color: rgb(255, 255, 255);
	flex-grow: 1;
	width: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
`;

const Messages = styled.div`
	margin: 10px;
`;

const Dropzone = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	height: 100%;
	width: 100%;
`;

export default function ChatComponent(props: IUser) {
	const [socket, setSocket] = useState<WebSocket>(new WebSocket(settings.ws));
	const [chat, setChat] = useState<IChat | null>(null);
	const [message, setMessage] = useState<any>();
	const [mutate, setMutate] = useState<string>('');
	const [dragOver, setDragOver] = useState<boolean>(false);

	const stateChange = () => {
		let ns = chatStore.getState();
		if (!ns) return;

		switch (ns.type) {
			case 'join':
				join(ns.room1);
				break;
			case 'leave':
				setMutate(ns.room2);
				leave(ns.room2);
				break;
			case 'switch':
				leave(ns.room2);
				join(ns.room1);
				break;
		}

		return setChat(ns.chat);
	};

	const join = (room: string): void => {
		return socket.send(
			JSON.stringify({
				type: 'join',
				room: room,
				user: props,
				socketId: props.sub,
			})
		);
	};

	const leave = (room: string): void => {
		return socket.send(
			JSON.stringify({
				type: 'leave',
				room: room,
				user: props,
				socketId: props.sub,
			})
		);
	};

	useEffect(() => {
		if (mutate.length === 0) return;
		setChat(null);
		setMutate('');
	}, [mutate]);

	useEffect(() => {
		if (!chat) return;
		setChat({
			...chat,
			messages: [...chat.messages, message],
		});
	}, [message]);

	useEffect(() => {
		let us = chatStore.subscribe(stateChange);

		socket.onopen = () => {
			console.log('WebSocket -> OPEN');
		};

		socket.onclose = () => {
			setSocket(new WebSocket(settings.ws));
		};

		socket.onmessage = (event: any) => {
			let data = JSON.parse(event.data);

			if (data.type === 'event') {
				console.log(data);
			}

			setMessage(data);
		};

		return () => us();
	}, []);

	if (!chat) return <NoChatComponent />;

	return (
		<Content>
			<Dropzone>
				<Chat>
					<ChatHeaderComponent
						room={chat._id}
						user={props}
						admin={chat.participants.some(
							(p: IUser) =>
								p.sub === props.sub && p.role === 'admin'
						)}
					/>
					<Messages>
						{chat.messages.map((m: IMessage, i: number) => (
							<ChatMessageComponent
								key={i}
								message={m}
								sub={props.sub}
							/>
						))}
					</Messages>
				</Chat>

				<ChatFormComponent
					room={chat._id}
					user={props}
					socket={socket}
				/>
			</Dropzone>
		</Content>
	);
}
