import styled from 'styled-components'

export const TaskContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 10px 0;
`

export const TitleContainer = styled.div`
	display: flex;
	align-items: center;
`

export const Complete = styled.button`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 2px solid hotpink;
	border-style: solid;
	background-color: ${(props) => (props.complete ? 'hotpink' : 'grey')};
	color: white;
	font-size: 1.5rem;
	${(props) => (props.complete ? '&:after {content: "✓";}' : '')};
`

export const Title = styled.p`
	font-size: 1.5rem;
	padding: 5px;
	text-decoration: ${(props) => (props.complete ? 'line-through' : 'none')};
`
export const ControlContainer = styled.div`
	display: flex;
	align-items: center;
`

export const EditButton = styled.button`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	border: 2px solid #70a1d7;
	border-style: solid;
	background-color: #70a1d7;
	color: white;
	font-size: 1.5rem;
	transform: scale(-1, 1);
	&:after {
		content: '✎';
	}
`

export const DeleteButton = styled.button`
	width: 40px;
	height: 40px;
	margin-left: 10px;
	border-radius: 50%;
	border: 2px solid #f47c7c;
	border-style: solid;
	background-color: #f47c7c;
	color: white;
	font-size: 1.5rem;
	&:after {
		content: '🗑';
	}
`
