/** @format */

import RouterComponent from '../Navigation/RouterComponent';
import settings from 'Utils/settings';
import { Auth0Provider } from '@auth0/auth0-react';

export default function OutletComponent(): JSX.Element {
	return (
		<Auth0Provider
			domain='dustiastheguy.eu.auth0.com'
			clientId='tHpiYXCts8DbgyPXbEuV3TST6XGrBXc0'
			redirectUri={settings.host}>
			<RouterComponent />
		</Auth0Provider>
	);
}
