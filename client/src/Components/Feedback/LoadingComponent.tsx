/** @format */

import classes from 'Styles/loading.module.css';

export default function LoadingComponent(props: any): JSX.Element {
	return (
		<div className={classes.container}>
			<div className={classes.loader}>
				<div></div>
				<div></div>
			</div>
			<p>{props.reason ? props.reason : 'Loading...'}</p>
		</div>
	);
}
