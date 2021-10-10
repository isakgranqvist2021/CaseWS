/** @format */

import styled from 'styled-components';

const Chat = styled.div`
	background-color: rgb(100, 100, 100);
	flex-grow: 1;
	width: 100%;
	overflow: auto;
`;

export default function MessagesComponent(): JSX.Element {
	return (
		<Chat>
			<p>Chat!</p>
		</Chat>
	);
}
