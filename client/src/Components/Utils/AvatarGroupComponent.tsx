/** @format */

import { useState } from 'react';
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
	const [ints, setInts] = useState<number[]>([]);

	return (
		<AvatarGroup>
			{props.images
				.slice(0, props.max)
				.map((img: { src: string; alt: string }, i: number) => (
					<AvatarItem key={img.src}>
						{!ints.includes(i) ? (
							<img
								src={img.src}
								alt={img.alt}
								onError={(e: any) => setInts([...ints, i])}
							/>
						) : (
							<span>{img.alt[0]}</span>
						)}
					</AvatarItem>
				))}
			{overflow > 0 && <AvatarItem>+{overflow}</AvatarItem>}
		</AvatarGroup>
	);
}
