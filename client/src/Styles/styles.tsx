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

export const Button = styled('button')<{ small?: boolean; fontSize?: string }>`
	width: ${(props) => (props.small ? 'auto' : '90%')};

	height: 100%;
	padding: 13px;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: #faf7f0;
	color: #7e2d97;

	cursor: pointer;
	border: none;

	transition: all 300ms ease;

	span {
		font-size: inherit;
	}

	&:hover {
		background-color: #e9e6e0;
	}
`;

export const Input = styled.input`
	flex-grow: 1;
	padding: 13px;
	border: none;
	background-color: #faf7f0;
	outline: none;
	border-right: 1px solid #7e2d97;
`;
