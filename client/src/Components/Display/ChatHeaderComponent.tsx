/** @format */

import { useEffect, useState } from 'react';
import { POST } from 'Utils/http';
import { AvatarItem } from 'Styles/styles';
import styled from 'styled-components';
import chatStore from 'Store/chat.store';

const Header = styled.header`
	background-color: #333;
	padding: 10px;
	position: relative;
`;

const Form = styled.div`
	width: 100%;
	display: flex;

	input {
		flex-grow: 1;
	}

	input,
	button {
		padding: 10px;
	}
`;

const Results = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	background-color: #707070;
`;

const List = styled.ul`
	color: #fff;
`;

const ListItem = styled.li`
	display: flex;
	align-items: center;
	padding: 10px;
	cursor: pointer;

	&:not(:last-of-type) {
		border-bottom: 1px solid #fff;
	}

	p {
		margin-left: 15px;
	}
`;

export default function ChatHeaderComponent() {
	const [value, setValue] = useState<string>('');
	const [results, setResults] = useState<any[]>([]);

	const search = async (): Promise<any> => {
		if (!value) return;
		setResults([]);

		const response = await POST({
			path: '/chat/users/search',
			body: JSON.stringify({ value }),
		});

		if (response.success) setResults(response.data);
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') return search();
	};

	useEffect(() => {
		chatStore.subscribe(() => {
			setResults([]);
		});
	}, []);

	return (
		<Header>
			<Form>
				{results.length > 0 && (
					<button onClick={() => setResults([])}>Close</button>
				)}
				<input
					onKeyPress={handleKeyPress}
					placeholder='Peter Smith'
					value={value}
					onChange={(e: any) => setValue(e.target.value)}
				/>
				<button onClick={search}>Search</button>
			</Form>

			{results.length > 0 && (
				<Results>
					<List>
						{results.map((r: any, i: number) => (
							<ListItem>
								<AvatarItem>
									<img src={r.picture} alt={r.nickname} />
								</AvatarItem>
								<p>{r.nickname}</p>
							</ListItem>
						))}
					</List>
				</Results>
			)}
		</Header>
	);
}
