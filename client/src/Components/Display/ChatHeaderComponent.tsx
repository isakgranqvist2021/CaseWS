/** @format */

import { useEffect, useState } from 'react';
import { POST } from 'Utils/http';
import { AvatarItem } from 'Styles/styles';
import styled from 'styled-components';
import chatStore from 'Store/chat.store';
import participantsStore from 'Store/participants.store';

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
	height: 400px;
	overflow: auto;
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

export default function ChatHeaderComponent(props: {
	room: string;
	admin: boolean;
}): JSX.Element {
	const [value, setValue] = useState<string>('');
	const [results, setResults] = useState<any[]>([]);
	const [open, setOpen] = useState<boolean>(false);
	const [ints, setInts] = useState<any>([]);

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

	const add = async (u: any) => {
		const payload = {
			user: u,
			room: props.room,
		};

		const response = await POST({
			path: '/chat/add-user',
			body: JSON.stringify(payload),
		});

		window.alert(response.message);

		if (response.success) {
			participantsStore.dispatch({
				type: 'add',
				payload: payload,
			});
		}

		setOpen(false);
	};

	const handleBlur = () => {
		if (results.length > 0) return;
		return setOpen(false);
	};

	useEffect(() => {
		chatStore.subscribe(() => {
			setResults([]);
		});
	}, []);

	return (
		<Header>
			{props.admin && (
				<Form>
					<button onClick={() => setOpen(false)}>Close</button>
					<input
						onBlur={handleBlur}
						onFocus={() => setOpen(true)}
						onKeyPress={handleKeyPress}
						placeholder='Peter Smith'
						value={value}
						onChange={(e: any) => setValue(e.target.value)}
					/>
					<button onClick={search}>Search</button>
				</Form>
			)}

			{open && props.admin && (
				<Results>
					<List>
						{results.map((r: any, i: number) => (
							<ListItem key={i} onClick={() => add(r)}>
								<AvatarItem>
									{!ints.includes(i) ? (
										<img
											src={r.picture}
											alt={r.nickname}
											onError={(e: any) =>
												setInts([...ints, i])
											}
										/>
									) : (
										<span>{r.nickname[0]}</span>
									)}
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
