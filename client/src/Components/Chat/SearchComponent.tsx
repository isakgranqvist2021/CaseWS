/** @format */

import { useEffect, useState } from 'react';
import chatStore from 'Store/chat.store';
import styled from 'styled-components';
import participantsStore from 'Store/participants.store';
import IconComponent from 'Components/Utils/IconComponent';
import { POST } from 'Utils/http';
import { AvatarItem } from 'Styles/styles';
import { Input, Button } from 'Styles/styles';

const Form = styled.div`
	width: 50%;
	display: flex;
	align-items: center;
	position: relative;
`;

const Results = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	background-color: #7e2d97;
	height: 400px;
	overflow: auto;
	border: 1px solid #fff;
`;

const ListItem = styled.li`
	display: flex;
	align-items: center;
	padding: 10px;
	cursor: pointer;
	color: #faf7f0;

	&:not(:last-of-type) {
		border-bottom: 1px solid #faf7f0;
	}

	p {
		margin-left: 15px;
	}
`;

export default function SearchComponent(props: { room: string }): JSX.Element {
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

		console.log(response);

		if (response.success) setResults(response.data);
	};

	useEffect(() => {
		let us = chatStore.subscribe(() => {
			setResults([]);
		});

		return () => us();
	}, []);

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

	return (
		<Form>
			{open && (
				<Button onClick={() => setOpen(false)} small={true}>
					<IconComponent icon='close' />
				</Button>
			)}
			<Input
				onBlur={handleBlur}
				onFocus={() => setOpen(true)}
				onKeyPress={handleKeyPress}
				placeholder='Peter Smith'
				value={value}
				onChange={(e: any) => setValue(e.target.value)}
			/>
			<Button onClick={search} small={true}>
				<IconComponent icon='search' />
			</Button>

			{open && (
				<Results>
					<ul>
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
					</ul>
				</Results>
			)}
		</Form>
	);
}
