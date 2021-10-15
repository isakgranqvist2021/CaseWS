/** @format */

import { useCallback } from 'react';
import { formatDistance } from 'date-fns';
import { AvatarItem } from 'Styles/styles';
import styled from 'styled-components';

const Avatar = styled.div`
	position: absolute;
	right: -15px;
	top: -15px;
`;

const Uploads = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin: 10px 0;
`;

const Images = styled.div`
	display: flex;
	flex-wrap: wrap;

	img {
		width: 150px;
		object-fit: contain;
		margin-right: auto;
		display: block;
	}
`;

const Message = styled.div`
	position: relative;
	margin: 10px 0;

	&.message,
	&.file {
		color: #ffffff;
		padding: 15px;
		position: relative;
		background-color: #ffffff;
		border-radius: 0.4em;
		width: 75%;
		display: flex;
		background-color: #3a3a3a;
		margin: 25px 0;

		@media (max-width: 960px) {
			width: 90%;
		}
	}
`;

const Body = styled.div`
	flex-grow: 1;
	margin-left: 10px;
	color: #ffffff;

	&.event {
		color: #333;
		display: flex;
		font-size: 13px;

		span {
			margin-right: 10px;
		}
	}
`;

const Header = styled.header`
	display: flex;
	font-size: 13px;
	gap: 10px;
	color: #da6bff;
`;

export default function ChatMessageComponent(props: {
	message: IMessage;
	sub: string | undefined;
}): JSX.Element {
	const { message } = props;

	const formatDate = useCallback((): string => {
		return formatDistance(
			typeof message.createdAt === 'string'
				? new Date(message.createdAt)
				: message.createdAt,
			new Date(),
			{
				addSuffix: true,
			}
		);
	}, [props.message.createdAt]);

	const fileExists = useCallback((): boolean => {
		if (!message.files) return false;

		return message.files.some((f: any) => f.fileType === 'file');
	}, [props.message]);

	return (
		<Message
			className={[
				message.type,
				message.user.sub === props.sub ? 'me' : '',
			].join(' ')}>
			{message.type !== 'event' && (
				<Avatar title={message.user.nickname}>
					<AvatarItem>
						<img
							src={message.user.picture}
							alt={message.user.nickname}
						/>
					</AvatarItem>
				</Avatar>
			)}
			<Body className={message.type}>
				<Header>
					{message.type !== 'event' && (
						<span>
							{message.user.sub === props.sub
								? 'You'
								: message.user.nickname}
						</span>
					)}
					<span>{formatDate()}</span>
				</Header>

				{message.files && (
					<Uploads>
						{fileExists() && (
							<div>
								{message.files
									.filter((f: any) => f.fileType === 'file')
									.map((f: any, i: number) => (
										<a
											key={i}
											href={f.src}
											rel='noreferrer'
											target='_blank'
											style={{ color: '#fff' }}>
											{f.filename}
										</a>
									))}
							</div>
						)}

						<Images>
							{message.files
								.filter((f: any) => f.fileType === 'image')
								.map((f: any, i: number) => (
									<a
										key={i}
										href={f.src}
										rel='noreferrer'
										target='_blank'>
										<img src={f.src} alt={f.filename} />
									</a>
								))}
						</Images>
					</Uploads>
				)}

				<p
					style={{
						marginTop:
							!message.files && message.type !== 'event' ? 10 : 0,
					}}>
					{message.message}
				</p>
			</Body>
		</Message>
	);
}
