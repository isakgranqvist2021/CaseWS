/** @format */

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'Styles/styles';
import { POST } from 'Utils/http';
import SidebarHeaderComponent from 'Components/Display/SidebarHeaderComponent';
import ChatsComponent from 'Components/Display/ChatsComponent';

import styled from 'styled-components';
import { useState } from 'react';

const Aside = styled.aside`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 275px;
	height: 100vh;
	background-color: #2e3132;
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 275px;
	height: 100vh;
`;

const Content = styled.div`
	flex-grow: 1;
	background-color: #2e3132;
	width: 100%;
`;

const Footer = styled.footer`
	width: 100%;
	display: flex;
	gap: 10px;
	padding: 0 10px;
`;

export default function SidebarComponent(props: IUser): JSX.Element {
	const { logout } = useAuth0();
	const [newChat, setNewChat] = useState<IChat | null>(null);

	const submit = async () => {
		const abortController = new AbortController();

		const response = await POST({
			path: '/chat/create',
			body: JSON.stringify(props),
			signal: abortController.signal,
		});

		window.alert(response.message);

		if (response.success) {
			setNewChat(response.data);
		}
	};

	return (
		<Aside>
			<Body>
				<SidebarHeaderComponent {...props} />
				<Content>
					<ChatsComponent user={props} newChat={newChat} />
				</Content>
				<Footer>
					<Button
						onClick={() =>
							logout({ returnTo: 'http://localhost:3000' })
						}>
						Log Out
					</Button>
					<Button onClick={submit}>New Chat</Button>
				</Footer>
			</Body>
		</Aside>
	);
}
