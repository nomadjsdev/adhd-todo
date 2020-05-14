import styled from 'styled-components'

import Colors from 'Styles/Colors'

const Button = styled.button`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border-style: solid;
	color: ${Colors.white};
	font-size: 1.5rem;
`

export const TaskContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
	cursor: default;
`

export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
`

export const Complete = styled(Button)`
	margin-right: 10px;
	border: 2px solid ${Colors.highlight};
	background-color: ${(props) =>
		props.complete ? Colors.highlight : Colors.grey};
	${(props) => (props.complete ? '&:after {content: "✓";}' : '')};
`

export const Title = styled.p`
	width: 100%;
	font-size: 1.5rem;
	padding: 5px;
	text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
`

export const EditTitle = styled.input.attrs({ type: 'text' })`
	background-color: ${Colors.grey};
	color: ${Colors.white};
	border: none;
	border-bottom: 2px solid ${Colors.white};
	width: 100%;
	margin: 0 20px 0 5px;
	padding-left: 3px;
	font-size: 1.5rem;

	&:focus {
		outline: none;
	}
`

export const ControlContainer = styled.div`
	display: flex;
	align-items: center;
`

export const EditButton = styled(Button)`
	border: 2px solid ${Colors.info};
	background-color: ${Colors.info};
	transform: scale(-1, 1);

	&:after {
		content: '✎';
	}
`

export const SaveButton = styled(Button)`
	border: 2px solid ${Colors.success};
	background-color: ${Colors.success};

	&:after {
		content: '✓';
	}
`

export const CancelButton = styled(Button)`
	margin-left: 10px;
	border: 2px solid ${Colors.danger};
	background-color: ${Colors.danger};

	&:after {
		content: '×';
	}
`

export const DeleteButton = styled(Button)`
	margin-left: 10px;
	border: 2px solid ${Colors.danger};
	background-color: ${Colors.danger};

	&:after {
		content: '🗑';
	}
`
