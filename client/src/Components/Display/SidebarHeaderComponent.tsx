/** @format */

import { POST } from 'Utils/http';
import styled from 'styled-components';
import chatsStore from 'Store/chats.store';

const Header = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 50px 0 20px 0;

	p {
		margin-top: 20px;
	}

	img {
		height: 150px;
		width: 150px;
		object-fit: contain;
		border-radius: 50%;
	}

	button {
		margin-top: 20px;
		padding: 10px 20px;
	}
`;

export default function SidebarHeaderComponent(props: IUser): JSX.Element {
	const submit = async () => {
		const abortController = new AbortController();

		const response = await POST({
			path: '/chat/create',
			body: JSON.stringify(props),
			signal: abortController.signal,
		});

		window.alert(response.message);

		if (response.success) {
			chatsStore.dispatch({ type: 'new', payload: response.data });
		}
	};

	return (
		<Header>
			<img src={props.picture} />
			<p>{props.nickname}</p>
			<button onClick={submit}>New Chat</button>
		</Header>
	);
}
