/** @format */

import { useAuth0 } from '@auth0/auth0-react';

import styled from 'styled-components';
import LoadingComponent from 'Components/Feedback/LoadingComponent';
import SidebarComponent from 'Components/Sidebar/SidebarComponent';
import ChatComponent from 'Components/Chat/ChatComponent';

const App = styled.div`
	display: flex;
`;

export default function AppComponent(): JSX.Element {
	const { user, isLoading } = useAuth0();

	if (isLoading) {
		return (
			<LoadingComponent
				reason='Loading user information..'
				loader={true}
			/>
		);
	}

	return (
		<App>
			<SidebarComponent {...user} />
			<ChatComponent {...user} />
		</App>
	);
}
