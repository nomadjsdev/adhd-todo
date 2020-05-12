import React from 'react'
import ReactDOM from 'react-dom'
import { Reset } from 'styled-reset'

import App from 'View/App'

import { GlobalStyle } from './index.styles'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<React.StrictMode>
		<Reset />
		<GlobalStyle />
		<App />
	</React.StrictMode>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
