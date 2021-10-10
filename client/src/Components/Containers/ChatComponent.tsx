/** @format */

import MessageComponent from 'Components/Display/MessageComponent';
import styled from 'styled-components';

const Chat = styled.div`
	background-color: rgb(100, 100, 100);
	flex-grow: 1;
	width: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
`;

export default function ChatComponent(props: IChat): JSX.Element {
	return (
		<Chat>
			{props.messages.map((msg: any, i: number) => (
				<MessageComponent
					key={i}
					message={msg.message}
					nickname={msg.nickname}
					date={msg.createdAt}
				/>
			))}
		</Chat>
	);
}
