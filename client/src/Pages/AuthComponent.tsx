/** @format */

import { useAuth0 } from '@auth0/auth0-react';

import settings from 'Utils/settings';
import classes from 'Styles/auth.module.css';

export default function AuthComponent(): JSX.Element {
	const { loginWithRedirect } = useAuth0();

	return (
		<div className={classes.container}>
			<h1>Please sign in to continue</h1>
			<button
				className={classes.btn}
				onClick={() =>
					loginWithRedirect({ redirectUri: settings.host })
				}>
				Log In
			</button>
		</div>
	);
}
