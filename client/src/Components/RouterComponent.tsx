/** @format */

import { useAuth0 } from '@auth0/auth0-react';

import LoadingComponent from './LoadingComponent';
import AuthComponent from 'Pages/AuthComponent';
import ChatComponent from 'Pages/ChatComponent';

export default function RouterComponent(): JSX.Element {
	const { isAuthenticated, isLoading } = useAuth0();

	if (isLoading) return <LoadingComponent reason='auth0 loading...' />;

	return !isAuthenticated ? <AuthComponent /> : <ChatComponent />;
}
