/** @format */

import MessageComponent from 'Components/Display/MessageComponent';
import ChatHeaderComponent from 'Components/Display/ChatHeaderComponent';
import styled from 'styled-components';

const Chat = styled.div`
	background-color: rgb(255, 255, 255);
	flex-grow: 1;
	width: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
`;

export default function ChatComponent(props: {
	messages: IMessage[];
	socket: WebSocket;
	admin: boolean;
	room: string;
}): JSX.Element {
	return (
		<Chat>
			<ChatHeaderComponent room={props.room} admin={props.admin} />
			{props.messages.map((m: any, i: number) => (
				<MessageComponent
					key={i}
					message={m.message}
					nickname={m.user.nickname}
					date={m.createdAt}
				/>
			))}
		</Chat>
	);
}
