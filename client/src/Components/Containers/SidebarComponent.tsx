/** @format */

import { useAuth0 } from '@auth0/auth0-react';
import SidebarHeaderComponent from 'Components/Display/SidebarHeaderComponent';
import ChatsComponent from 'Components/Display/ChatsComponent';

import styled from 'styled-components';

const Aside = styled.aside`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 230px;
	height: 100vh;
	background-color: rgb(231, 231, 231);
`;

const Body = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 230px;
	height: 100vh;
`;

const Content = styled.div`
	flex-grow: 1;
	background-color: rgb(243, 243, 243);
	width: 100%;
`;

const Footer = styled.footer`
	width: 100%;
	padding: 20px;

	button {
		width: 100%;
		display: block;
		padding: 10px;
	}
`;

export default function SidebarComponent(props: IUser): JSX.Element {
	const { logout } = useAuth0();

	return (
		<Aside>
			<Body>
				<SidebarHeaderComponent {...props} />
				<Content>
					<ChatsComponent {...props} />
				</Content>
				<Footer>
					<button
						onClick={() =>
							logout({ returnTo: 'http://localhost:3000' })
						}>
						Log Out
					</button>
				</Footer>
			</Body>
		</Aside>
	);
}
