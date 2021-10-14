/** @format */

import { useState } from 'react';
import { AvatarItem } from 'Styles/styles';
import styled from 'styled-components';

const Typing = styled.div`
	display: inline-block;
	position: relative;
	width: 25px;
	height: 25px;

	div {
		position: absolute;
		top: calc(50% - 2.5px);
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #fff;
		animation-timing-function: cubic-bezier(0, 1, 1, 0);

		&:nth-child(1) {
			left: 2px;
			animation: lds-ellipsis1 0.6s infinite;
		}

		&:nth-child(2) {
			left: 2px;
			animation: lds-ellipsis2 0.6s infinite;
		}

		&:nth-child(3) {
			left: 8px;
			animation: lds-ellipsis2 0.6s infinite;
		}

		&:nth-child(4) {
			left: 14px;
			animation: lds-ellipsis3 0.6s infinite;
		}
	}

	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(12px, 0);
		}
	}
`;

const Participants = styled.div`
	position: absolute;
	right: 25px;
	top: 100px;
	overflow: auto;
`;

export default function ChatParticipantsComponent(props: {
	participants: IParticipant[];
}): JSX.Element {
	const [ints, setInts] = useState<number[]>([]);

	return (
		<Participants>
			{props.participants.map((p: IParticipant, i: number) => (
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
