/** @format */

import RouterComponent from './RouterComponent';
import { Auth0Provider } from '@auth0/auth0-react';

export default function OutletComponent(): JSX.Element {
	return (
		<Auth0Provider
			domain='dustiastheguy.eu.auth0.com'
			clientId='tHpiYXCts8DbgyPXbEuV3TST6XGrBXc0'
			redirectUri='http://localhost:3000/auth'>
			<RouterComponent />
		</Auth0Provider>
	);
}
