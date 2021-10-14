/** @format */

import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import ChatFormComponent from 'Components/Chat/ChatFormComponent';
import ChatMessageComponent from 'Components/Chat/ChatMessageComponent';
import ChatHeaderComponent from 'Components/Chat/ChatHeaderComponent';
import ChatParticipantsComponent from 'Components/Chat/ChatParticipantsComponent';
import ChatWaitingComponent from 'Components/Chat/ChatWaitingComponent';
import settings from 'Utils/settings';
import chatStore from 'Store/chat.store';
import sidebarStore from 'Store/sidebar.store';

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
	const [message, setMessage] = useState<any>();
	const [mutate, setMutate] = useState<boolean>(false);
	const [hideEvents, setHideEvents] = useState<boolean>(false);

	const [part, setPart] = useState<IParticipant[]>([]);
	const [t, setT] = useState<{
		type: 'occurance';
		reason: 'typing';
		room: string;
		sub: string;
		newState: boolean;
	} | null>(null);

	const stateChange = () => {
		let ns = chatStore.getState();
		if (!ns) return;

		switch (ns.type) {
			case 'join':
				join(ns.room1);
				break;
			case 'leave':
				setMutate(true);
				return leave(ns.room2);
			case 'switch':
				leave(ns.room2);
				join(ns.room1);
				break;
		}

		setPart(
			ns.chat.participants.map((u: IUser) => ({
				sub: u.sub,
				picture: u.picture,
				nickname: u.nickname,
				isTyping: false,
			}))
		);

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
		if (message && chat) {
			setChat({
				...chat,
				messages: [...chat.messages, message],
			});
			return setMessage(null);
		}

		if (mutate) {
			setMutate(false);
			sidebarStore.dispatch({
				type: 'set active',
				payload: null,
			});
			return setChat(null);
		}

		if (t) {
			let copy = part;
			let u = copy.find((u: IParticipant) => u.sub && u.sub === t.sub);
			if (!u) return;
			u.isTyping = t.newState;
			setPart([...copy]);
			return setT(null);
		}
	}, [message, mutate, t]);

	useEffect(() => {
		let us = chatStore.subscribe(stateChange);

		socket.onerror = () => window.location.reload();
		socket.onclose = () => {
			console.log('Socket disconnected');
			if (!chat) return;
			return setMutate(true);
		};
		socket.onopen = () => console.log('WebSocket -> OPEN');
		socket.onmessage = (event: any) => {
			let data = JSON.parse(event.data);

			if (data.type === 'occurance' && data.reason === 'left')
				return sidebarStore.dispatch({
					type: 'remove user',
					payload: {
						user: data.user.sub,
						room: data.room,
					},
				});

			if (data.type === 'occurance' && data.reason === 'typing')
				return setT(data);

			setMessage(data);
		};

		return () => us();
	}, []);

	if (!chat) return <ChatWaitingComponent />;

	return (
		<Content>
			<ChatParticipantsComponent participants={part} />

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

			<ChatFormComponent
				room={chat._id}
				user={props}
				socket={socket}
				participants={part}
			/>
		</Content>
	);
}
