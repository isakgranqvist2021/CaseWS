/** @format */

import { useState } from 'react';
import AvatarGroupComponent from 'Components/Utils/AvatarGroupComponent';
import IconComponent from '../Utils/IconComponent';
import styled from 'styled-components';

const Chat = styled.div`
	display: flex;
	justify-content: space-between;
	border-top: 1px solid #5c6c6c;
	padding: 10px;
`;

const Action = styled.button`
	color: #faf7f0;
	border: none;
	cursor: pointer;
	width: 75px;
	text-align: center;
	border-radius: 5px;

	&.leave {
		background-color: #7e2d97;
		color: #fff;
	}

	&.join {
		background-color: #fff;
		color: #7e2d97;
	}
`;

export default function SidebarChatComponent(props: {
	chat: IChat;
	active: boolean;
	action: any;
}): JSX.Element {
	const { chat, active, action } = props;

	return (
		<Chat key={chat._id}>
			<AvatarGroupComponent
				max={4}
				images={chat.participants.map((p: IUser) => {
					return {
						src: p.picture,
						alt: p.nickname,
					};
				})}
			/>

			{active ? (
				<Action className='leave' onClick={() => action('leave', chat)}>
					<IconComponent icon='exit_to_app' />
				</Action>
			) : (
				<Action className='join' onClick={() => action('join', chat)}>
					<IconComponent icon='chevron_right' />
				</Action>
			)}
		</Chat>
	);
}
