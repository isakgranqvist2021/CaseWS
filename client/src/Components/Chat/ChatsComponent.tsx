/** @format */

import { useEffect, useState } from 'react';
import { GET } from 'Utils/http';
import chatStore from 'Store/chat.store';
import participantsStore from 'Store/participants.store';
import SidebarChatComponent from '../Sidebar/SidebarChatComponent';

export default function ChatsComponent(props: {
	user: IUser;
	newChat: IChat | null;
}): JSX.Element {
	const [chats, setChats] = useState<IChat[]>([]);
	const [active, setActive] = useState<string | null>(null);
	const [np, setNp] = useState<{
		user: IUser;
		room: string;
	} | null>(null);

	const fetchChats = async (signal: AbortSignal) => {
		const response = await GET({
			path: '/chat/chats/' + props.user.sub,
			signal: signal,
		});

		if (response.success) setChats(response.data);
		return Promise.resolve();
	};

	const fetchChat = async (room: string) => {
		const abortController = new AbortController();

		setTimeout(() => () => abortController.abort(), 5000);
		const response = await GET({
			path: '/chat/find/' + room,
			signal: abortController.signal,
		});

		if (response.success) {
			let c = chats;
			c[c.findIndex((value: IChat) => value._id === room)] =
				response.data;
			return setChats([...c]);
		}
	};

	const action = async (action: string, chat: IChat) => {
		await fetchChat(chat._id);

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

	useEffect(() => {
		if (!np) return;
		let update = chats;
		let room = update.find((c: IChat) => c._id === np?.room);
		if (!room) return;
		room.participants.push(np.user);
		setChats([...update]);
	}, [np]);

	useEffect(() => {
		const abortController = new AbortController();
		fetchChats(abortController.signal);

		participantsStore.subscribe(() => {
			let ns = participantsStore.getState();
			if (!ns) return;
			setNp(ns);
		});

		return () => abortController.abort();
	}, [props.user.sub]);

	useEffect(() => {
		if (!props.newChat) return;
		setChats([...chats, props.newChat]);
	}, [props.newChat]);

	return (
		<div>
			{chats.map((chat: IChat) => (
				<SidebarChatComponent
					key={chat._id}
					chat={chat}
					action={action}
					active={active === chat._id}
				/>
			))}
		</div>
	);
}
