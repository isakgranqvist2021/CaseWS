/** @format */

import { useState } from 'react';
import { Input, Button } from 'Styles/styles';
import styled from 'styled-components';
import IconComponent from 'Components/Utils/IconComponent';

const Form = styled.div`
	background-color: #7e2d97;
	display: flex;
	align-items: center;
	padding: 1rem;
`;

export default function ChatFormComponent(props: {
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
				user: props.user,
				message: message,
			})
		);
		setMessage('');
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') return send();
	};

	return (
		<Form>
			<Input
				onKeyPress={handleKeyPress}
				placeholder='Message..'
				value={message}
				onChange={(e: any) => setMessage(e.target.value)}
			/>
			<Button onClick={send} small={true}>
				<IconComponent icon='send' />
			</Button>
		</Form>
	);
}
