/** @format */

import { Switch, BrowserRouter, Route } from 'react-router-dom';

import AuthComponent from 'Pages/AuthComponent';
import ChatComponent from 'Pages/ChatComponent';

export default function RouterComponent(): JSX.Element {
	return (
		<BrowserRouter>
			<nav></nav>
			<Switch>
				<Route path='/' component={AuthComponent} exact />
				<Route path='/chat' component={ChatComponent} exact />
			</Switch>
		</BrowserRouter>
	);
}
