import React from 'react'
import ReactDOM from 'react-dom'

import App from 'View/App'

import GlobalStyle from 'Styles/GlobalSyle'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
)

serviceWorker.register()
