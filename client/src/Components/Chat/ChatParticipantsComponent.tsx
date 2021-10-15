/** @format */

import { useState, useEffect } from 'react';
import { AvatarItem, Typing } from 'Styles/styles';
import styled from 'styled-components';
import partStore from 'Store/part.store';

const Participants = styled.div`
	position: absolute;
	right: 25px;
	top: 100px;
	overflow: auto;
`;

export default function ChatParticipantsComponent(props: {
	socket: WebSocket;
}): JSX.Element {
	const [ints, setInts] = useState<number[]>([]);
	const [part, setPart] = useState<IParticipant[]>([]);

	useEffect(() => {
		let us = partStore.subscribe(() => {
			setPart([...partStore.getState()]);
		});

		if (part.length <= 0) {
			partStore.dispatch({
				type: 'get state',
				payload: null,
			});
		}

		return () => us();
	}, []);

	return (
		<Participants>
			{part.map((p: IParticipant, i: number) => (
				<AvatarItem style={{ margin: '0 0 5px 0' }} key={i}>
					{p.isTyping && (
						<Typing>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</Typing>
					)}

					{!p.isTyping && !ints.includes(i) && (
						<img
							src={p.picture}
							alt=''
							onError={(e: any) => setInts([...ints, i])}
						/>
					)}

					{!p.isTyping && ints.includes(i) && (
						<span>{p.nickname ? p.nickname[0] : 'U'}</span>
					)}
				</AvatarItem>
			))}
		</Participants>
	);
}
