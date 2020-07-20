import styled from 'styled-components'

import Colors from './Colors'

export const Button = styled.button`
	width: 36px;
	height: 36px;
	border-radius: 50%;
	border-style: solid;
	color: ${Colors.white};
	font-size: 1.4rem;
	margin-left: 10px;
	display: flex;
	justify-content: center;
	align-items: center;

	&:after {
		position: absolute;
	}

	&:disabled {
		opacity: 0.3;
	}
`

export const AddButton = styled(Button)`
	border: 2px solid ${Colors.highlight};
	background-color: ${Colors.highlight};
	font-size: 1.9rem;
	position: relative;

	&:after {
		content: '+';
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

export const EditButton = styled(Button)`
	border: 2px solid ${Colors.info};
	background-color: ${Colors.info};
	transform: scale(-1, 1);

	&:after {
		content: '✎';
	}
`

export const DeleteButton = styled(Button)`
	border: 2px solid ${Colors.danger};
	background-color: ${Colors.danger};

	&:after {
		content: '🗑';
	}
`

export const MoveHandle = styled.div`
	width: 36px;
	height: 36px;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${Colors.info};
	margin-right: 10px;

	&:after {
		content: '☰';
	}
`
