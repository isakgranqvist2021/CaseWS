/** @format */

import IconComponent from 'Components/Utils/IconComponent';
import { useState, useEffect } from 'react';
import { Button } from 'Styles/styles';
import { POST } from 'Utils/http';
import styled from 'styled-components';
import chatStore from 'Store/chat.store';
import sidebarStore from 'Store/sidebar.store';

const Menu = styled.div`
	position: relative;

	@media (max-width: 960px) {
		margin-left: 10px;
	}
`;

const DropDown = styled('div')<{ open: boolean }>`
	position: absolute;
	right: 0;
	width: 250px;
	max-height: 300px;
	overflow: auto;
	background-color: #7e2d97;
	border: 1px solid #fff;
	transition: all 300ms ease;
	z-index: 3;

	opacity: ${(props) => (props.open ? '1' : '0')};
`;

const List = styled.ul`
	list-style-type: none;
`;

const ListItem = styled.li`
	color: #fff;
	padding: 10px;
	cursor: pointer;
	transition: all 300ms ease;

	&:not(:last-of-type) {
		border-bottom: 1px solid #fff;
	}

	&:hover {
		background-color: #823599;
	}
`;

export default function ChatActionsComponent(props: {
	room: string;
	admin: boolean;
	user: IUser;
	events: {
		state: boolean;
		action: any;
	};
}): JSX.Element {
	const [open, setOpen] = useState<boolean>(false);

	const onClick = () => {
		setOpen(false);
	};

	const leave = async () => {
		sidebarStore.dispatch({ type: 'set active', payload: null });
		chatStore.dispatch({
			type: 'leave',
			payload: {
				chat: null,
				room1: undefined,
				room2: props.room,
			},
		});

		const response = await POST({
			path: '/chat/leave',
			body: JSON.stringify({
				room: props.room,
				user: props.user,
			}),
		});

		if (response.success) {
			sidebarStore.dispatch({
				type: 'remove user',
				payload: {
					user: response.data.user.sub,
					room: response.data.room,
				},
			});
		}
	};

	const delChat = () => {};

	useEffect(() => {
		window.addEventListener('click', onClick);
		return () => window.removeEventListener('click', onClick);
	}, []);

	return (
		<Menu onClick={(e: any) => e.stopPropagation()}>
			<Button small={true} onClick={() => setOpen(!open ? true : false)}>
				<IconComponent icon={!open ? 'more_vert' : 'close'} />
			</Button>

			<DropDown open={open}>
				<List>
					<ListItem
						onClick={() =>
							props.events.action(
								!props.events.state ? true : false
							)
						}>
						{props.events.state ? 'Show' : 'Hide'} Events
					</ListItem>
					<ListItem onClick={leave}>Leave Chat</ListItem>
					{props.admin && (
						<ListItem onClick={delChat}>Delete Chat</ListItem>
					)}
				</List>
			</DropDown>
		</Menu>
	);
}
