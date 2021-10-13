/** @format */

import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h2 {
		margin-bottom: 50px;
		font-size: 4rem;
		font-weight: 900;
		color: #7e2d97;
	}
`;

export default function NoChatComponent(): JSX.Element {
	return (
		<Container>
			<h2>Waiting room...</h2>
			<img
				height='400'
				src={process.env.PUBLIC_URL + '/undraw_Group_chat_re_frmo.svg'}
			/>
		</Container>
	);
}
