/** @format */

import { useEffect, useState } from 'react';
import { GET, POST } from 'Utils/http';
import styled from 'styled-components';
import AvatarGroupComponent from 'Components/Display/AvatarGroupComponent';
import chatStore from 'Store/chat.store';

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

	const action = (action: string, chat: IChat) => {
		if (action === 'leave') {
			chatStore.dispatch({
				type: 'leave',
				payload: {
					chat: chat,
					room1: undefined,
					room2: active,
				},
			});
			return setActive(null);
		}

		if (active) {
			setActive(chat._id);
			return chatStore.dispatch({
				type: 'switch',
				payload: {
					chat: chat,
					room1: chat._id,
					room2: active,
				},
			});
		}

		setActive(chat._id);
		return chatStore.dispatch({
			type: 'join',
			payload: {
				chat: chat,
				room1: chat._id,
				room2: undefined,
			},
		});
	};

	const submit = async () => {
		const abortController = new AbortController();

		const response = await POST({
			path: '/chat/create',
			body: JSON.stringify(props),
			signal: abortController.signal,
		});

		window.alert(response.message);

		if (response.success) {
			setChats([...chats, response.data]);
		}
	};

	useEffect(() => {
		const abortController = new AbortController();
		fetchChats(abortController.signal);

		return () => abortController.abort();
	}, [props.sub]);

	return (
		<div>
			<button onClick={submit}>New Chat</button>

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
						<button onClick={() => action('leave', chat)}>
							Leave Chat
						</button>
					) : (
						<button onClick={() => action('join', chat)}>
							Join Chat
						</button>
					)}
				</Chat>
			))}
		</div>
	);
}
