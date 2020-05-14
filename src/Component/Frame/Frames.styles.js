import styled from 'styled-components'

import Colors from 'Styles/Colors'

export const FrameContainer = styled.div`
	margin-bottom: 20px;
	border: 1px solid ${Colors.black};
	border-radius: 5px;
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	background-color: ${Colors.black};
`

export const TextContainer = styled.div`
	display: flex;
	align-items: baseline;
`

export const Title = styled.h2`
	font-size: 2rem;
	margin: 5px 10px 0 0;
`

export const TimeSpan = styled.span`
	font-size: 1.2rem;
`

export const TasksContainer = styled.div`
	padding: 10px;
`

export const AddTaskButton = styled.button`
	background-color: ${Colors.highlight};
	height: 40px;
	width: 40px;
	border: 0;
	border-radius: 50%;
	font-size: 2rem;
	color: ${Colors.white};
	&:after {
		content: '+';
	}
`
