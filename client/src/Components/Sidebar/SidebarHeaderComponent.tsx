/** @format */

import styled from 'styled-components';

const Header = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	padding: 50px 0 20px 0;

	p {
		margin-top: 20px;
		color: #faf7f0;
		display: flex;
		align-items: center;
	}

	img {
		height: 150px;
		width: 150px;
		object-fit: contain;
		border-radius: 50%;
	}
`;

export default function SidebarHeaderComponent(props: IUser): JSX.Element {
	return (
		<Header>
			<img src={props.picture} alt={props.nickname} />
			<p>
				<span>{props.nickname}</span>
			</p>
		</Header>
	);
}
