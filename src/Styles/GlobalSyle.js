import React from 'react'
import { Reset } from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

import Colors from 'Styles/Colors'

const GlobalStyle = createGlobalStyle`
html {
  background-color: ${Colors.highlight};
}

body {
  background-color: ${Colors.grey};
  color: white;
  min-height: calc(100vh - 56px);
  max-width: 600px;
  margin: 8px auto;
  padding: 20px 10px;
  border-radius: 5px;
  font-family: sans-serif;
}
`

export default () => (
	<React.Fragment>
		<Reset />
		<GlobalStyle />
	</React.Fragment>
)
