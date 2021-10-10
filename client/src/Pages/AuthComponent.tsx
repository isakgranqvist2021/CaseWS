/** @format */

import { useAuth0 } from '@auth0/auth0-react';

import settings from 'Utils/settings';
import styled from 'styled-components';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	h1 {
		margin-top: 20px;
		font-weight: 900;
		font-size: 2rem;
		color: gray;
	}

	button {
		margin-top: 20px;
		padding: 1rem;
		width: 150px;
		border: none;
		background-color: orange;
		font-weight: 900;
		color: #fff;
		border-radius: 0.5rem;
		cursor: pointer;
		border: 1px solid transparent;
		transition: all 300ms ease;

		&:hover {
			background-color: #fff;
			border-color: orange;
			color: orange;
		}
	}
`;

export default function AuthComponent(): JSX.Element {
	const { loginWithRedirect } = useAuth0();

	return (
		<Container>
			<h1>Please sign in to continue</h1>
			<button
				onClick={() =>
					loginWithRedirect({ redirectUri: settings.host })
				}>
				Log In
			</button>
		</Container>
	);
}
