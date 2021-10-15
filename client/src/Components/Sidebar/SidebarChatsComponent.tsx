/** @format */

import { useEffect, useState } from 'react';
import { GET } from 'Utils/http';
import chatStore from 'Store/chat.store';
import SidebarChatComponent from './SidebarChatComponent';
import chatsStore from 'Store/chats.store';

export default function SidebarChatsComponent(props: {
	user: IUser;
}): JSX.Element {
	const [chats, setChats] = useState<IChat[]>([]);
	const [active, setActive] = useState<string | null>(null);

	const fetchChats = async (signal: AbortSignal) => {
		const response = await GET({
			path: '/chat/chats/' + props.user.sub,
			signal: signal,
		});

		if (response.success)
			return chatsStore.dispatch({ type: 'set', payload: response.data });
	};

	const fetchChat = async (room: string) => {
		const abortController = new AbortController();

		const response = await GET({
			path: '/chat/find/' + room,
			signal: abortController.signal,
		});

		if (response.success) return Promise.resolve(response.data);

		return Promise.reject('unable to join chat');
	};

	const action = async (id: string, includePayload: boolean) => {
		let chat = await fetchChat(id);

		if (active !== null)
			return chatStore.dispatch({
				type: 'set',
				payload: {
					chat: null,
					evType: 'leave',
				},
			});

		return chatStore.dispatch({
			type: 'set',
			payload: {
				chat: includePayload ? chat : null,
				evType: includePayload ? 'join' : 'leave',
			},
		});
	};

	useEffect(() => {
		const abortController = new AbortController();
		fetchChats(abortController.signal);

		chatsStore.subscribe(() => {
			setChats([...chatsStore.getState()]);
		});

		chatStore.subscribe(() => {
			let newState = chatStore.getState();

			if (newState && newState.chat) return setActive(newState.chat._id);

			return setActive(null);
		});
		return () => abortController.abort();
	}, [props.user.sub]);

	return (
		<div>
			{chats.map((chat: IChat) => (
				<SidebarChatComponent
					key={chat._id}
					chat={chat}
					action={action}
					active={
						active === null
							? null
							: active === chat._id
							? true
							: false
					}
				/>
			))}
		</div>
	);
}
