/** @format */

import styled from 'styled-components';

export const AvatarItem = styled.div`
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
	border-radius: 50%;
	overflow: hidden;
	user-select: none;
	color: #faf7f0;
	background-color: #2e3132;
	box-sizing: content-box;
	border: 2px solid #5c6c6c;
	font-size: 14px;
	text-transform: uppercase;

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

export const Button = styled('button')<{ small?: boolean }>`
	padding: 13px;
	display: block;
	margin: 10px auto;
	border-radius: 5px;
	border: none;
	background-color: #ffffff;
	cursor: pointer;
	width: ${(props) => (props.small ? 'auto' : '90%')};
	border: none;
	color: #7e2d97;
	min-width: 100px;
`;

export const Input = styled.input`
	flex-grow: 1;
	padding: 13px;
	border: none;
	background-color: #faf7f0;
	margin-right: 10px;
	border-radius: 5px;
`;
