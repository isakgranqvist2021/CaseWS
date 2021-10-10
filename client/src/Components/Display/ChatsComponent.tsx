/** @format */

import { useEffect, useState } from 'react';
import { GET, POST } from 'Utils/http';
import styled from 'styled-components';
import AvatarGroupComponent from 'Components/Display/AvatarGroupComponent';

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

	const join = (room: string) => {};

	const leave = (room: string) => {};

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
						<button onClick={() => leave(chat._id)}>
							Leave Chat
						</button>
					) : (
						<button onClick={() => join(chat._id)}>
							Join Chat
						</button>
					)}
				</Chat>
			))}
		</div>
	);
}
