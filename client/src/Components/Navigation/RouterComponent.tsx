/** @format */

import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LoadingComponent from '../Feedback/LoadingComponent';
import AuthComponent from 'Pages/AuthComponent';
import AppComponent from 'Pages/AppComponent';

export default function RouterComponent(): JSX.Element {
	const [loading, setLoading] = useState<boolean>(true);
	const { isAuthenticated, isLoading, error } = useAuth0();

	useEffect(() => {
		setLoading(isLoading);

		if (error !== undefined) {
			return () => {
				console.log(error);
				window.location.reload();
			};
		}
	}, [isLoading, error]);

	if (loading)
		return <LoadingComponent reason='auth0 loading' loader={true} />;
	return !isAuthenticated ? <AuthComponent /> : <AppComponent />;
}
