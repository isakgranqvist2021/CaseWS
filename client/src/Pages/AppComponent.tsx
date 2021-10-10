/** @format */

import { useAuth0 } from '@auth0/auth0-react';

import LoadingComponent from 'Components/Feedback/LoadingComponent';
import SidebarComponent from 'Components/Containers/SidebarComponent';

import classes from 'Styles/app.module.css';
import ContentComponent from 'Components/Containers/ContentComponent';

export default function AppComponent(): JSX.Element {
	const { user, isLoading } = useAuth0();

	if (isLoading) {
		return <LoadingComponent reason='Loading user information..' />;
	}

	return (
		<div className={classes.app}>
			<SidebarComponent {...user} />
			<ContentComponent />
		</div>
	);
}
