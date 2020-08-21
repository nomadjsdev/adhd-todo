import styled from 'styled-components'

import Colors from './Colors'

export const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	border-style: solid;
	color: ${Colors.white};
	font-size: 1.1rem;
	min-width: 25px;
	width: 25px;
	min-height: 25px;
	height: 25px;

	&:after {
		position: absolute;
	}

	&:disabled {
		opacity: 0.3;
	}
`

export const AddButton = styled(Button)`
	position: relative;
	font-size: 1.9rem;
	background-color: ${Colors.highlight};
	border: 2px solid ${Colors.highlight};

	&:after {
		content: '+';
	}
`

export const SaveButton = styled(Button)`
	background-color: ${Colors.success};
	border: 2px solid ${Colors.success};

	&:after {
		content: '✓';
	}
`

export const CancelButton = styled(Button)`
	background-color: ${Colors.danger};
	border: 2px solid ${Colors.danger};

	&:after {
		content: '×';
	}
`

export const EditButton = styled(Button)`
	background-color: ${Colors.info};
	border: 2px solid ${Colors.info};
	transform: scale(-1, 1);

	&:after {
		content: '✎';
	}
`

export const DeleteButton = styled(Button)`
	background-color: ${Colors.danger};
	border: 2px solid ${Colors.danger};

	&:after {
		content: '🗑';
	}
`

export const MoveHandle = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	background-color: ${Colors.info};
	min-width: 25px;
	width: 25px;
	min-height: 25px;
	height: 25px;

	&:after {
		content: '☰';
	}
`

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-left: 5px;

	& button:last-child {
		margin-left: 5px;
	}
`
