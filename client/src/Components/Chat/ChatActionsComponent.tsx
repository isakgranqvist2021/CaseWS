/** @format */

import IconComponent from 'Components/Utils/IconComponent';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'Styles/styles';

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

export default function ChatActionsComponent(): JSX.Element {
	const [open, setOpen] = useState<boolean>(false);

	const onClick = () => {
		setOpen(false);
	};

	const leave = () => {
		console.log('leave');
	};

	const report = () => {
		console.log('report');
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
					<ListItem onClick={leave}>Leave Chat</ListItem>
					<ListItem onClick={report}>Report Chat</ListItem>
					<ListItem onClick={delChat}>Delete Chat</ListItem>
				</List>
			</DropDown>
		</Menu>
	);
}
