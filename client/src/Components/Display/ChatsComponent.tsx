/** @format */

import { useEffect, useState } from 'react';
import { GET, POST } from 'Utils/http';
import styled from 'styled-components';
import AvatarGroupComponent from 'Components/Display/AvatarGroupComponent';
import chatStore from 'Store/chat.store';
import participantsStore from 'Store/participants.store';

const Chat = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid lightgray;
	padding: 10px;
`;

const Button = styled.button`
	width: 90%;
	padding: 5px;
	display: block;
	margin: 10px auto;
`;

const Action = styled.button`
	color: #fff;
	border: none;
	cursor: pointer;
	width: 75px;
	text-align: center;
	border-radius: 5px;

	&.leave {
		background-color: #bb576b;
	}

	&.join {
		background-color: #3ab362;
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
		return Promise.resolve();
	};

	const action = async (action: string, chat: IChat) => {
		const abortController = new AbortController();
		await fetchChats(abortController.signal);

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

		participantsStore.subscribe(() => {
			console.log(chats);

			let ns = participantsStore.getState();
			if (!ns) return;
			let update = chats;

			let room = update.find((c: IChat) => c._id === ns?.room);
			if (!room) return;
			room.participants.push(ns.user);

			setChats([...update]);
		});

		return () => abortController.abort();
	}, [props.sub]);

	return (
		<div>
			<Button onClick={submit}>New Chat</Button>

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
						<Action
							className='leave'
							onClick={() => action('leave', chat)}>
							Leave
						</Action>
					) : (
						<Action
							className='join'
							onClick={() => action('join', chat)}>
							Join
						</Action>
					)}
				</Chat>
			))}
		</div>
	);
}
