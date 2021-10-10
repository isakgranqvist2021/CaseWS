/** @format */

import { useState, useEffect } from 'react';

import styled from 'styled-components';

import FormComponent from 'Components/Containers/FormComponent';
import ChatComponent from 'Components/Containers/ChatComponent';
import LoadingComponent from 'Components/Feedback/LoadingComponent';
import settings from 'Utils/settings';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100vh;
`;

export default function ContentComponent(props: IUser) {
	let ws: WebSocket = new WebSocket(settings.ws);
	const [chat, setChat] = useState<IChat | null>();

	const addMessage = (data: any) => {};

	const send = (message: string) => {};

	useEffect(() => {
		ws.onopen = () => {};

		return () => ws.close();
	}, []);

	if (!chat) return <LoadingComponent reason='Please join a chat' />;

	return (
		<Content>
			<ChatComponent {...chat} />
			<FormComponent {...props} send={send} />
		</Content>
	);
}
