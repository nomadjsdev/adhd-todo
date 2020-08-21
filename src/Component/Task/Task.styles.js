import styled from 'styled-components'

import Colors from 'Styles/Colors'
import { Button } from 'Styles/Components'

export const TaskContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
	cursor: default;

	&:first-child {
		margin-top: 0;
	}

	&:last-child {
		margin-bottom: 0;
	}
`

export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`

export const Complete = styled(Button)`
	border: 2px solid ${Colors.highlight};
	background-color: ${(props) =>
		props.complete ? Colors.highlight : Colors.grey};

	${(props) => (props.complete ? '&:after {content: "✓";}' : '')};
`

export const Duplicate = styled(Button)`
	border: 2px solid ${Colors.info};
	background-color: ${Colors.info};

	&:after {
		content: '❏';
	}
`

export const Title = styled.p`
	width: 100%;
	font-size: 1.2rem;
	margin-left: 5px;
	text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
`

export const EditTitle = styled.input.attrs({ type: 'text' })`
	background-color: ${Colors.greyLight};
	color: ${Colors.white};
	border: none;
	min-width: 0;
	width: 100%;
	margin-left: 3px;
	font-size: 1.2rem;
	padding-right: 5px;

	&:focus {
		outline: none;
	}
`
