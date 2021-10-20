/** @format */

import { useState, useCallback, useEffect } from 'react';
import { Input, Button } from 'Styles/styles';
import { POST } from 'Utils/http';
import styled from 'styled-components';
import IconComponent from 'Components/Utils/IconComponent';
import partStore from 'Store/part.store';

const allowedFileExt: string[] = [
	'image/jpeg',
	'image/png',
	'image/jpg',
	'image/gif',
	'image/svg+xml',
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
	const [part, setPart] = useState<IParticipant[]>([]);

	const onType = (value: string) => {
		setMessage(value);

		let isAlreadyTyping = part.some((p: IParticipant) => {
			return p.sub === props.user.sub && p.isTyping;
		});

		if (!props.socket.OPEN) {
			console.log('socket not open');
		}

		if (isAlreadyTyping && !value) {
			return props.socket.send(
				JSON.stringify({
					type: 'occurance',
					reason: 'typing',
					room: props.room,
					sub: props.user.sub,
					newState: false,
				})
			);
		}

		if (!isAlreadyTyping && value)
			props.socket.send(
				JSON.stringify({
					type: 'occurance',
					reason: 'typing',
					room: props.room,
					sub: props.user.sub,
					newState: true,
				})
			);
	};

	const send = (): void => {
		if (!message) return;

		if (!props.socket.OPEN) {
			console.log(props.socket.OPEN);
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

		props.socket.send(
			JSON.stringify({
				type: 'occurance',
				reason: 'typing',
				room: props.room,
				sub: props.user.sub,
				newState: false,
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

		await POST({
			path: '/chat/upload',
			body: formData,
			headers: {},
		});
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') return send();
	};

	const handleDrag = (e: React.DragEvent<HTMLDivElement>, ns: boolean) => {
		e.preventDefault();
		setDrag(ns);
		return false;
	};

	const dragStyles = useCallback((): any => {
		return {
			opacity: drag ? 0 : 1,
			pointerEvents: drag ? 'none' : 'all',
		};
	}, []);

	useEffect(() => {
		partStore.subscribe(() => {
			setPart([...partStore.getState()]);
		});
	}, []);

	return (
		<Form
			className={drag ? 'active' : ''}
			onDrop={(e: any) => upload(e)}
			onDragOver={(e: any) => handleDrag(e, true)}
			onDragEnter={(e: any) => handleDrag(e, true)}
			onDragLeave={(e: any) => handleDrag(e, false)}>
			<Input
				style={dragStyles()}
				onKeyPress={handleKeyPress}
				placeholder='Message..'
				value={message}
				onChange={(e: any) => onType(e.target.value)}
			/>
			<Button style={dragStyles()} onClick={send} small={true}>
				<IconComponent icon='send' />
			</Button>

			{drag && (
				<IconContainer onDragOver={(e: any) => handleDrag(e, true)}>
					<IconComponent icon='cloud_upload' />
				</IconContainer>
			)}
		</Form>
	);
}
