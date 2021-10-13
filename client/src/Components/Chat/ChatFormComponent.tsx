/** @format */

import { useState } from 'react';
import { Input, Button } from 'Styles/styles';
import { POST } from 'Utils/http';
import styled from 'styled-components';
import IconComponent from 'Components/Utils/IconComponent';

const allowedFileExt: string[] = [
	'image/jpeg',
	'image/png',
	'image/jpg',
	'image/gif',
	'image/svg+xml',
	'application/pdf',
	'text/plain',
];

const Form = styled.div`
	background-color: #7e2d97;
	display: flex;
	align-items: center;
	padding: 1rem;
	position: relative;
	transition: all 300ms ease;

	&.active {
		background-color: #7e2d976f;
		padding: 3rem 1rem;
	}
`;

const IconContainer = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	color: #fff;
	transform: translate(-50%, -50%);
	pointer-events: none;
`;

export default function ChatFormComponent(props: {
	room: string;
	user: IUser;
	socket: WebSocket;
}): JSX.Element {
	const [message, setMessage] = useState<string>('');
	const [drag, setDrag] = useState<boolean>(false);

	const send = (): void => {
		if (!message) return;

		if (!props.socket.OPEN) {
			window.alert('connection has closed');
			window.location.reload();
		}

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

	const upload = async (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDrag(false);

		if (!props.socket.OPEN) {
			window.alert('connection has closed');
			window.location.reload();
		}

		if (e.dataTransfer.files.length >= 5)
			return window.alert('max 5 files each time');

		let formData = new FormData();

		for (let i = 0; i < e.dataTransfer.files.length; i++) {
			let file = e.dataTransfer.files[i];

			if (allowedFileExt.includes(file.type))
				formData.append('file', file);
		}

		formData.append('room', props.room);
		formData.append('user', JSON.stringify(props.user));
		const response = await POST({
			path: '/chat/upload',
			body: formData,
			headers: {},
		});

		window.alert(response.message);
		console.log(response);
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') return send();
	};

	const handleDrag = (e: React.DragEvent<HTMLDivElement>, ns: boolean) => {
		e.preventDefault();
		setDrag(ns);
		return false;
	};

	return (
		<Form
			className={drag ? 'active' : ''}
			onDrop={(e: React.DragEvent<HTMLDivElement>) => upload(e)}
			onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
				handleDrag(e, true)
			}
			onDragEnter={(e: React.DragEvent<HTMLDivElement>) =>
				handleDrag(e, true)
			}
			onDragLeave={(e: React.DragEvent<HTMLDivElement>) =>
				handleDrag(e, false)
			}>
			<Input
				style={{
					opacity: drag ? 0 : 1,
					pointerEvents: drag ? 'none' : 'all',
				}}
				onKeyPress={handleKeyPress}
				placeholder='Message..'
				value={message}
				onChange={(e: any) => setMessage(e.target.value)}
			/>
			<Button
				style={{
					opacity: drag ? 0 : 1,
					pointerEvents: drag ? 'none' : 'all',
				}}
				onClick={send}
				small={true}>
				<IconComponent icon='send' />
			</Button>

			{drag && (
				<IconContainer
					onDragOver={(e: React.DragEvent<HTMLDivElement>) =>
						handleDrag(e, true)
					}>
					<IconComponent icon='cloud_upload' />
				</IconContainer>
			)}
		</Form>
	);
}
