/** @format */

import { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';

const Form = styled.div`
	background-color: #333;
	display: flex;

	button,
	input {
		padding: 20px;
		border: none;
	}

	input {
		flex-grow: 1;
	}
`;

export default function FormComponent(props: {
	room: string;
	user: IUser;
	socket: WebSocket;
}): JSX.Element {
	const [message, setMessage] = useState<string>('');

	const send = (): void => {
		if (!message) return;
		props.socket.send(
			JSON.stringify({
				type: 'message',
				room: props.room,
				message: message,
				user: props.user,
			})
		);
		setMessage('');
	};

	return (
		<Form>
			<input
				placeholder='Message..'
				value={message}
				onChange={(e: any) => setMessage(e.target.value)}
			/>
			<button onClick={send}>Send</button>
		</Form>
	);
}
