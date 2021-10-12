/** @format */

import styled from 'styled-components';

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	inset: 0;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	p {
		margin-top: 20px;
		font-weight: 900;
		font-size: 2rem;
		color: #000000;
	}
`;

const Loader = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;

	div {
		position: absolute;
		border: 4px solid rgb(255, 255, 255);
		opacity: 1;
		border-radius: 50%;
		animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

		&:nth-child(2) {
			animation-delay: -0.5s;
		}
	}

	@keyframes lds-ripple {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
`;

export default function LoadingComponent(props: {
	reason: string | undefined;
	loader: boolean;
}): JSX.Element {
	return (
		<Container>
			{props.loader && (
				<Loader>
					<div></div>
					<div></div>
				</Loader>
			)}
			<p>{props.reason ? props.reason : 'Loading...'}</p>
		</Container>
	);
}
