/** @format */

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
	transition: all 300ms ease;
	border: 1px solid #7e2d97;
	background-color: #2e3132;
	display: flex;
	align-items: center;
	justify-content: center;

	&:disabled {
		opacity: 0.2;
		cursor: not-allowed;
	}

	&.leave {
		color: #fff;

		&:hover {
		}
	}

	&.join {
		color: #ffffff;
	}
`;

export default function SidebarChatComponent(props: {
	chat: IChat;
	active: boolean | null;
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

			{active !== null && active && (
				<Action
					className='leave'
					onClick={() => action(chat._id, false)}>
					<IconComponent icon='exit_to_app' />
				</Action>
			)}

			{active !== null && !active && (
				<Action
					className='join'
					onClick={() => action(chat._id, true)}
					disabled>
					<IconComponent icon='chevron_right' />
				</Action>
			)}

			{active === null && (
				<Action className='join' onClick={() => action(chat._id, true)}>
					<IconComponent icon='chevron_right' />
				</Action>
			)}
		</Chat>
	);
}
