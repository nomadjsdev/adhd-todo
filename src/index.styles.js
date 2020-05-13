import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
html {
  background-color: hotpink;
}

body {
  background-color: grey;
  color: white;
  min-height: 100vh;
  margin: 8px;
  padding: 20px 10px;
  border-radius: 5px;
  font-family: sans-serif;
}
`
