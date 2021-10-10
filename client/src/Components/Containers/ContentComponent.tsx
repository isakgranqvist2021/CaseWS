/** @format */

import classes from 'Styles/content.module.css';

import FormComponent from 'Components/Containers/FormComponent';
import ChatComponent from 'Components/Containers/ChatComponent';

export default function ContentComponent() {
	return (
		<div className={classes.content}>
			<ChatComponent />
			<FormComponent />
		</div>
	);
}
