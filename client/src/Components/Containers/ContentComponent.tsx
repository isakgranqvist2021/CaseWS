/** @format */

import styled from 'styled-components';

import FormComponent from 'Components/Containers/FormComponent';
import ChatComponent from 'Components/Containers/ChatComponent';

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100vh;
`;

export default function ContentComponent() {
	return (
		<Content>
			<ChatComponent />
			<FormComponent />
		</Content>
	);
}
