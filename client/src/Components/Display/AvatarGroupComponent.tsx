/** @format */

import { AvatarItem } from 'Styles/styles';
import styled from 'styled-components';
const AvatarGroup = styled.div`
	display: flex;
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
