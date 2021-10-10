/** @format */

import { useState, useEffect, ChangeEvent } from 'react';
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
	const [message, setMessage] = useState<string>('');

	const send = () => {};

	return (
		<Form>
			<input
				placeholder='Message..'
				value={message}
				onChange={(e: any) => setMessage(e.target.value)}
			/>
			<button onClick={send}>Send</button>
		</Form>
	);
}
