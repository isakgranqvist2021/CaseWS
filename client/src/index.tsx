/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import OutletComponent from 'Components/Utils/OutletComponent';

ReactDOM.render(
	<React.StrictMode>
		<OutletComponent />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
