/** @format */

import { formatDistance } from 'date-fns';
import styled from 'styled-components';

const Message = styled.div`
	color: #000000;
	padding: 10px;
`;

const Header = styled.header`
	display: flex;
	color: #535353;
	font-size: 13px;
	gap: 10px;
	margin-bottom: 10px;
`;

export default function ChatMessageComponent(props: {
	message: string;
	nickname: string;
	date: Date | string;
}): JSX.Element {
	let date = props.date;
	if (typeof date === 'string') {
		date = new Date(props.date);
	}

	return (
		<Message>
			<Header>
				<p>{formatDistance(date, new Date(), { addSuffix: true })}</p>
				<p>{props.nickname}</p>
			</Header>
			<p>{props.message}</p>
		</Message>
	);
}
