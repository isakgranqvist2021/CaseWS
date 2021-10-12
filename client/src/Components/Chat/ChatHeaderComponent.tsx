/** @format */

import styled from 'styled-components';

import SearchComponent from './SearchComponent';
import ChatActionsComponent from './ChatActionsComponent';

const Header = styled.header`
	background-color: #7e2d97;
	display: flex;
	justify-content: space-between;
`;

export default function ChatHeaderComponent(props: {
	room: string;
	admin: boolean;
}): JSX.Element {
	return (
		<Header>
			{props.admin && <SearchComponent room={props.room} />}
			<ChatActionsComponent />
		</Header>
	);
}
