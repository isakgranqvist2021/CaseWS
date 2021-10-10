/** @format */

import { useEffect, useState } from 'react';
import { GET } from 'Utils/http';
import styled from 'styled-components';
import AvatarGroupComponent from 'Components/Display/AvatarGroupComponent';

const Chat = styled.div`
	border-bottom: 1px solid lightgray;
	padding: 10px;
`;

export default function ChatsComponent(props: {
	sub: string | undefined;
}): JSX.Element {
	const [chats, setChats] = useState<IChat[]>([]);
	const fetchChats = async (signal: AbortSignal) => {
		const response = await GET({
			path: '/chat/chats/' + props.sub,
			signal: signal,
		});

		if (response.success) setChats(response.data);
	};

	useEffect(() => {
		if (props.sub !== undefined) {
			const abortController = new AbortController();
			fetchChats(abortController.signal);
			return () => abortController.abort();
		}
	}, [props.sub]);

	return (
		<div>
			{chats.map((chat: any) => (
				<Chat>
					<AvatarGroupComponent
						max={4}
						images={chat.participants.map((p: IUser) => {
							return {
								src: p.picture,
								alt: p.nickname,
							};
						})}
					/>
				</Chat>
			))}
		</div>
	);
}
