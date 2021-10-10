/** @format */

import styled from 'styled-components';

const Message = styled.div`
	color: #fff;
	padding: 10px;
`;

const Header = styled.header`
	display: flex;
	color: #bdbdbd;
	font-size: 13px;
	gap: 10px;
	margin-bottom: 10px;
`;

interface Props {
	message: string;
	nickname: string;
	date: Date | string;
}

export default function MessageComponent(props: Props): JSX.Element {
	return (
		<Message>
			<Header>
				<p>{props.date}</p>
				<p>{props.nickname}</p>
			</Header>
			<p>{props.message}</p>
		</Message>
	);
}
