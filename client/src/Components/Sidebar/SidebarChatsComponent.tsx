/** @format */

import { useEffect, useState } from 'react';
import { GET } from 'Utils/http';
import chatStore from 'Store/chat.store';
import sidebarStore from 'Store/sidebar.store';
import participantsStore from 'Store/participants.store';
import SidebarChatComponent from './SidebarChatComponent';

export default function SidebarChatsComponent(props: {
	user: IUser;
	newChat: IChat | null;
}): JSX.Element {
	const [chats, setChats] = useState<IChat[]>([]);
	const [active, setActive] = useState<string | null>(null);
	const [np, setNp] = useState<{
		user: IUser;
		room: string;
	} | null>(null);
	const [pl, setPl] = useState<{ user: string; room: string } | null>(null);

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
		if (!pl) return;
		let copy = chats;
		let chatIndex = copy.findIndex((c: IChat) => c._id === pl.room);
		if (chatIndex < 0) return;

		if (props.user.sub === pl.user) {
			copy.splice(chatIndex, 1);
			return setChats([...copy]);
		}

		copy[chatIndex].participants.splice(
			copy[chatIndex].participants.findIndex(
				(u: IUser) => u.sub === pl.user
			),
			1
		);
		setChats([...copy]);
		return setPl(null);
	}, [pl]);

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

	useEffect(() => {
		sidebarStore.subscribe(() => {
			let state = sidebarStore.getState();

			if (!state) return;
			if (state.event === 'set active') return setActive(null);
			if (state.event === 'remove user')
				return setPl({
					user: state.payload.user,
					room: state.payload.room,
				});
		});
	}, []);

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
