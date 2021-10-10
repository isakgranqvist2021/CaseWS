/** @format */

import { useEffect, useState } from 'react';
import { GET } from 'Utils/http';
import styled from 'styled-components';
import AvatarGroupComponent from 'Components/Display/AvatarGroupComponent';

import chatStore from 'Store/chat.store';
import chatsStore from 'Store/chats.store';
import ioStore from 'Store/io.store';

const Chat = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid lightgray;
	padding: 10px;

	button {
		font-size: 12px;
		padding: 5px;
	}
`;

export default function ChatsComponent(props: IUser): JSX.Element {
	const [chats, setChats] = useState<IChat[]>([]);
	const [active, setActive] = useState<string | null>(null);

	const fetchChats = async (signal: AbortSignal) => {
		const response = await GET({
			path: '/chat/chats/' + props.sub,
			signal: signal,
		});

		if (response.success) setChats(response.data);
	};

	const enter = (chat: IChat) => {
		if (active) {
			leave(chat);
		}

		setActive(chat._id);
		return chatStore.dispatch({
			type: 'set',
			payload: chat,
		});
	};

	const leave = (chat: IChat) => {
		ioStore.dispatch({
			type: 'leave',
			payload: {
				socket: props.sub,
				chat: active,
			},
		});
	};

	const onUpdate = () => {
		chatsStore.subscribe(() => {
			let newChat = chatsStore.getState();
			if (newChat) setChats([...chats, newChat]);
		});
	};

	useEffect(() => {
		onUpdate();

		if (props.sub !== undefined) {
			const abortController = new AbortController();
			fetchChats(abortController.signal);
			return () => abortController.abort();
		}
	}, [props.sub]);

	return (
		<div>
			{chats.map((chat: IChat) => (
				<Chat key={chat._id}>
					<AvatarGroupComponent
						max={4}
						images={chat.participants.map((p: IUser) => {
							return {
								src: p.picture,
								alt: p.nickname,
							};
						})}
					/>

					{active !== null && active === chat._id ? (
						<button onClick={() => leave(chat)}>Leave Chat</button>
					) : (
						<button onClick={() => enter(chat)}>Join Chat</button>
					)}
				</Chat>
			))}
		</div>
	);
}
