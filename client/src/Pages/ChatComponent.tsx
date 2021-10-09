/** @format */

import { useAuth0 } from '@auth0/auth0-react';
import LoadingComponent from 'Components/LoadingComponent';

export default function ChatComponent(): JSX.Element {
	const { logout, user, isLoading } = useAuth0();

	if (isLoading) {
		return <LoadingComponent />;
	}

	return (
		<div>
			{user?.name}
			<button
				onClick={() =>
					logout({ returnTo: 'http://localhost:3000/auth' })
				}>
				Log Out
			</button>
		</div>
	);
}
