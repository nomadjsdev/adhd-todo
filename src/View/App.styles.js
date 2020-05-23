import styled from 'styled-components'

import Colors from 'Styles/Colors'

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0 10px;
`

export const EditFramesButton = styled.button`
	background-color: ${Colors.highlight};
	border-color: ${Colors.highlight};
	border-style: none;
	border-radius: 5px;
	color: ${Colors.white};
	padding: 5px 10px;
	margin-bottom: 20px;
`
