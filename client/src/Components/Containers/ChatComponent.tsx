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

export default function ChatComponent(): JSX.Element {
	return (
		<Chat>
			{new Array(250).fill(0).map((msg: any, i: number) => (
				<MessageComponent
					key={i}
					message={'message ' + i}
					nickname={'Isak'}
					date={new Date().toLocaleString()}
				/>
			))}
		</Chat>
	);
}
