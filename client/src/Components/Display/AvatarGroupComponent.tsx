/** @format */

import styled from 'styled-components';

const AvatarGroup = styled.div`
	display: flex;
`;

const AvatarItem = styled.div`
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
	margin-left: -8px;
	border: 2px solid rgb(233, 233, 233);
	box-sizing: content-box;
	font-size: 12px;

	img {
		width: 100%;
		height: 100%;
		text-align: center;
		object-fit: cover;
		color: transparent;
		text-indent: 10000px;
	}
`;

export default function AvatarGroupComponent(props: {
	max: number;
	images: any[];
}): JSX.Element {
	const overflow = props.images.length - props.max;

	return (
		<AvatarGroup>
			{props.images
				.slice(0, props.max)
				.map((img: { src: string; alt: string }) => (
					<AvatarItem key={img.src}>
						<img src={img.src} alt={img.alt} />
					</AvatarItem>
				))}
			{overflow > 0 && <AvatarItem>+{overflow}</AvatarItem>}
		</AvatarGroup>
	);
}
