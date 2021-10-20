/** @format */

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'Styles/styles';
import { POST } from 'Utils/http';
import SidebarHeaderComponent from 'Components/Sidebar/SidebarHeaderComponent';
import SidebarChatsComponent from 'Components/Sidebar/SidebarChatsComponent';
import IconComponent from 'Components/Utils/IconComponent';
import styled from 'styled-components';
import { useState } from 'react';
import chatsStore from 'Store/chats.store';

const Aside = styled.aside`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 275px;
	height: 100vh;
	background-color: #2e3132;
	transition: all 300ms ease;

	@media (max-width: 960px) {
		position: fixed;
		z-index: 5;
		width: 0;
		overflow: hidden;

		&.open {
			width: 275px;
		}
	}
`;

const Toggle = styled.button`
	position: fixed;
	right: 0;
	bottom: 0;
	width: 50px;
	height: 50px;
	background-color: #7e2d97;
	z-index: 5;
	transition: all 300ms ease;
	border: none;
	margin: 0 50px 90px 0;
	border-radius: 50%;
	color: #fff;
	cursor: pointer;
	display: none;

	@media (max-width: 960px) {
		display: block;
	}
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 275px;
	height: 100vh;
	position: relative;
`;

const Content = styled.div`
	flex-grow: 1;
	background-color: #2e3132;
	width: 100%;
`;

const Footer = styled.footer`
	width: 100%;
	padding: 10px;
	display: flex;
	flex-direction: column;

	button {
		width: 100%;
		border-radius: 5px;
		background-color: #7e2d97;
		color: #fff;

		&:not(:last-of-type) {
			margin-bottom: 10px;
		}

		&:hover {
			color: #7e2d97;
		}
	}
`;

export default function SidebarComponent(props: IUser): JSX.Element {
	const { logout } = useAuth0();
	const [open, setOpen] = useState<boolean>(false);

	const submit = async () => {
		const abortController = new AbortController();

		const response = await POST({
			path: '/chat/create',
			body: JSON.stringify(props),
			signal: abortController.signal,
		});

		window.alert(response.message);

		if (response.success)
			return chatsStore.dispatch({
				type: 'add chat',
				payload: response.data,
			});
	};

	return (
		<div>
			<Aside className={open ? 'open' : ''}>
				<Body>
					<SidebarHeaderComponent {...props} />
					<Content>
						<SidebarChatsComponent user={props} />
					</Content>
					<Footer>
						<Button onClick={submit}>New Room</Button>
						<Button
							onClick={() =>
								logout({ returnTo: 'http://localhost:3000' })
							}>
							Log Out
						</Button>
					</Footer>
				</Body>
			</Aside>

			<Toggle
				className={open ? 'open' : ''}
				onClick={() => setOpen(!open ? true : false)}>
				<IconComponent icon={!open ? 'menu' : 'close'} />
			</Toggle>
		</div>
	);
}
