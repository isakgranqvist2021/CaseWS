/** @format */

import { formatDistance } from 'date-fns';
import { AvatarItem } from 'Styles/styles';
import styled from 'styled-components';

const Event = styled.div`
	padding: 6px;
	font-size: 12px;
	display: flex;
	gap: 10px;

	&:not(:last-of-type) {
		margin-bottom: 10px;
	}
`;

const Uploads = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;

	img {
		max-height: 200px;
		object-fit: contain;
		margin-right: auto;
		display: block;
	}
`;

const Files = styled.div`
	a {
		color: #fff;
	}
`;

const Images = styled.div`
	display: flex;
	flex-wrap: wrap;

	img {
		max-height: 200px;
		object-fit: contain;
		margin-right: auto;
		display: block;
	}
`;

const Message = styled.div`
	color: #ffffff;
	padding: 15px;
	background-color: #187ef3;
	position: relative;
	background-color: #494949;
	border-radius: 0.4em;
	width: 75%;
	display: flex;

	&:not(:last-of-type) {
		margin-bottom: 15px;
	}

	&.me {
		background-color: #929292;
	}

	@media (max-width: 960px) {
		width: 90%;
	}
`;

const Body = styled.div`
	flex-grow: 1;
	margin-left: 10px;
`;

const Header = styled.header`
	display: flex;
	color: #ffffff;
	font-size: 13px;
	gap: 10px;
	margin-bottom: 10px;
`;

export default function ChatMessageComponent(props: {
	message: IMessage;
	sub: string | undefined;
}): JSX.Element {
	const { message } = props;
	console.log(message);

	let date = message.createdAt;
	if (typeof date === 'string') {
		date = formatDistance(new Date(message.createdAt), new Date(), {
			addSuffix: true,
		});
	}

	if (message.type === 'file') {
		return (
			<Message className={message.user.sub === props.sub ? 'me' : ''}>
				<AvatarItem>
					<img src={message.user.picture} />
				</AvatarItem>
				<Body>
					<Header>
						<span>{date}</span>
						<span>{message.user.nickname}</span>
					</Header>
					{message.files && (
						<Uploads>
							<Files>
								{message.files
									.filter((f: any) => f.fileType === 'file')
									.map((f: any, i: number) => (
										<a key={i} href={f.src} target='_blank'>
											{f.filename}
										</a>
									))}
							</Files>

							<Images>
								{message.files
									.filter((f: any) => f.fileType === 'image')
									.map((f: any, i: number) => (
										<a key={i} href={f.src} target='_blank'>
											<img src={f.src} alt={f.filename} />
										</a>
									))}
							</Images>
						</Uploads>
					)}
				</Body>
			</Message>
		);
	}

	if (message.type === 'event')
		return (
			<Event>
				<span>{date}</span>
				<p>{message.message}</p>
			</Event>
		);

	return (
		<Message className={message.user.sub === props.sub ? 'me' : ''}>
			<AvatarItem>
				<img src={message.user.picture} />
			</AvatarItem>
			<Body>
				<Header>
					<span>{date}</span>
					<span>{message.user.nickname}</span>
				</Header>
				<p>{message.message}</p>
			</Body>
		</Message>
	);
}
