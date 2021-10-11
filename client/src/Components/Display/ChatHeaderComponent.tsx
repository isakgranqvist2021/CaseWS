/** @format */

import { useState } from 'react';
import { POST } from 'Utils/http';
import styled from 'styled-components';

const Header = styled.header`
	background-color: #333;
	padding: 10px;
	display: flex;
	position: relative;

	input {
		flex-grow: 1;
	}

	input,
	button {
		padding: 10px;
	}
`;

export default function ChatHeaderComponent() {
	const [value, setValue] = useState<string>('');

	const search = async (): Promise<any> => {
		if (!value) return;

		const response = await POST({
			path: '/chat/users/search',
			body: JSON.stringify({ value }),
		});

		console.log(response);
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') return search();
	};

	return (
		<Header>
			<input
				onKeyPress={handleKeyPress}
				placeholder='Peter Smith'
				value={value}
				onChange={(e: any) => setValue(e.target.value)}
			/>
			<button onClick={search}>Search</button>
		</Header>
	);
}
