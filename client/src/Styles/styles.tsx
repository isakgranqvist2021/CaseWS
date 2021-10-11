/** @format */

import styled from 'styled-components';

export const AvatarItem = styled.div`
	position: relative;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	flex-shrink: 0;
	width: 30px;
	height: 30px;
	font-family: Roboto, Helvetica, Arial, sans-serif;
	font-size: 1.25rem;
	line-height: 1;
	border-radius: 50%;
	overflow: hidden;
	user-select: none;
	color: rgb(18, 18, 18);
	background-color: rgb(231, 231, 231);
	box-sizing: content-box;
	border: 2px solid rgb(233, 233, 233);
	box-sizing: content-box;
	font-size: 12px;

	&:not(:first-of-type) {
		margin-left: -8px;
	}

	img {
		width: 100%;
		height: 100%;
		text-align: center;
		object-fit: cover;
		color: transparent;
		text-indent: 10000px;
	}
`;
