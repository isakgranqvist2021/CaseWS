/** @format */

import styled from 'styled-components';

const Form = styled.div`
	background-color: #333;
	display: flex;

	button,
	input {
		padding: 20px;
		border: none;
	}

	input {
		flex-grow: 1;
	}
`;

export default function FormComponent(): JSX.Element {
	return (
		<Form>
			<input placeholder='Message..' />
			<button>Send</button>
		</Form>
	);
}
