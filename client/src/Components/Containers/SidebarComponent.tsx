/** @format */

import { useAuth0 } from '@auth0/auth0-react';

import classes from 'Styles/aside.module.css';

interface Props {
	email?: string;
	email_verified?: boolean;
	name?: string;
	nickname?: string;
	picture?: string;
	sub?: string;
	updated_at?: Date | string;
}

export default function SidebarComponent(props: Props): JSX.Element {
	const { logout } = useAuth0();

	return (
		<aside className={classes.aside}>
			<div className={classes.asideBody}>
				<div className={classes.asideHeader}>
					<img src={props.picture} />
					<p>{props.nickname}</p>
				</div>
				<div className={classes.asideContent}>
					<p>aside content</p>
				</div>
				<div className={classes.asideFooter}>
					<button
						onClick={() =>
							logout({ returnTo: 'http://localhost:3000' })
						}>
						Log Out
					</button>
				</div>
			</div>
		</aside>
	);
}
