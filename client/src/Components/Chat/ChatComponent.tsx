/** @format */

import { useState, useEffect } from 'react';
import styled from 'styled-components';

import ChatFormComponent from 'Components/Chat/ChatFormComponent';
import ChatMessageComponent from 'Components/Chat/ChatMessageComponent';
import ChatHeaderComponent from 'Components/Chat/ChatHeaderComponent';
import ChatParticipantsComponent from 'Components/Chat/ChatParticipantsComponent';
import ChatWaitingComponent from 'Components/Chat/ChatWaitingComponent';
import settings from 'Utils/settings';
import chatStore from 'Store/chat.store';
import chatsStore from 'Store/chats.store';
import partStore from 'Store/part.store';

const Content = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
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
	padding: 30px;
`;

export default function ChatComponent(props: IUser) {
	const socket: WebSocket = new WebSocket(settings.ws);
	const [chat, setChat] = useState<IChat | null>(null);
	const [hideEvents, setHideEvents] = useState<boolean>(false);

	const join = (chat: IChat): void => {
		if (socket.OPEN !== 1) return window.alert('connection lost');

		socket.send(
			JSON.stringify({
				type: 'join',
				room: chat._id,
				user: props,
				socketId: props.sub,
			})
		);

		return setChat(chat);
	};

	const leave = (room: string): void => {
		socket.send(
			JSON.stringify({
				type: 'leave',
				room: room,
				user: props,
				socketId: props.sub,
			})
		);

		return setChat(null);
	};

	useEffect(() => {
		socket.onerror = () => window.location.reload();

		socket.onclose = () => {
			console.log('Socket disconnected');
		};

		socket.onopen = () => console.log('WebSocket -> OPEN');
		socket.onmessage = (event: any) => {
			let data = JSON.parse(event.data);

			console.log(data);

			if (data.type === 'occurance' && data.reason === 'left')
				return chatsStore.dispatch({
					type: 'remove user',
					payload: {
						user: data.user.sub,
						room: data.room,
					},
				});

			if (data.type === 'occurance' && data.reason === 'typing')
				return partStore.dispatch({
					type: 'update',
					payload: {
						sub: data.sub,
						newState: data.newState,
					},
				});

			if (data) {
				return chatStore.dispatch({
					type: 'add message',
					payload: {
						message: data,
						evType: data.type,
					},
				});
			}
		};

		chatStore.subscribe(() => {
			let newState = chatStore.getState();
			if (newState === null) setChat(null);

			if (newState) {
				const newConn = ['leave', 'join'].includes(newState.evType);

				if (newState.prevConn && newConn)
					return leave(newState.prevConn);

				if (newState.chat && newConn) {
					partStore.dispatch({
						type: 'set',
						payload: newState.chat.participants.map((u: IUser) => ({
							sub: u.sub,
							picture: u.picture,
							nickname: u.nickname,
							isTyping: false,
						})),
					});

					return join(newState.chat);
				}

				return setChat({ ...newState.chat });
			}
		});
	}, []);

	if (!chat) return <ChatWaitingComponent />;

	return (
		<Content>
			<ChatParticipantsComponent socket={socket} />

			<Chat>
				<ChatHeaderComponent
					events={{
						state: hideEvents,
						action: setHideEvents,
					}}
					room={chat._id}
					user={props}
					admin={chat.participants.some(
						(p: IUser) => p.sub === props.sub && p.role === 'admin'
					)}
				/>
				<Messages>
					{chat.messages
						.filter((m: IMessage) =>
							hideEvents ? m.type !== 'event' : m
						)
						.map((m: IMessage, i: number) => (
							<ChatMessageComponent
								key={i}
								message={m}
								sub={props.sub}
							/>
						))}
				</Messages>
			</Chat>

			<ChatFormComponent room={chat._id} user={props} socket={socket} />
		</Content>
	);
}
