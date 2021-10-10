/** @format */

import { useAuth0 } from '@auth0/auth0-react';

import styled from 'styled-components';
import LoadingComponent from 'Components/Feedback/LoadingComponent';
import SidebarComponent from 'Components/Containers/SidebarComponent';
import ContentComponent from 'Components/Containers/ContentComponent';

const App = styled.div`
	display: flex;
`;

export default function AppComponent(): JSX.Element {
	const { user, isLoading } = useAuth0();

	if (isLoading) {
		return <LoadingComponent reason='Loading user information..' />;
	}

	return (
		<App>
			<SidebarComponent {...user} />
			<ContentComponent {...user} />
		</App>
	);
}
