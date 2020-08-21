import styled from 'styled-components'

import Colors from 'Styles/Colors'

export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin: 0 10px 10px;
	outline: 1px solid ${Colors.grey};
`

export const EditFramesButton = styled.button`
	background-color: ${Colors.highlight};
	border-color: ${Colors.highlight};
	border-style: none;
	border-radius: 5px;
	color: ${Colors.white};
	padding: 5px 10px;
`

export const Title = styled.h2`
	font-size: 2rem;
	margin: 5px 10px 0 0;
`
