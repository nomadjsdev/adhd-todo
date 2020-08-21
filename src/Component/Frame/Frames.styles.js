import styled from 'styled-components'

import Colors from 'Styles/Colors'

export const FrameContainer = styled.div`
	outline: 1px solid ${Colors.black};
	margin-bottom: 10px;
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	background-color: ${Colors.black};
`

export const TextContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	min-width: 0;
`

export const Title = styled.h2`
	align-self: center;
	font-size: 1.2rem;
	margin-left: 5px;
`

export const EditTitle = styled.input.attrs({ type: 'text' })`
	background-color: ${Colors.grey};
	color: ${Colors.white};
	border: none;
	font-size: 1.2rem;
	min-width: 0;
	margin-left: 3px;

	&:focus {
		outline: none;
	}
`

export const TimeSpan = styled.span`
	align-self: center;
	font-size: 1.2rem;
`

export const EditTime = styled(EditTitle)`
	max-width: 45px;
	padding: 0;
	text-align: right;
`

export const TasksContainer = styled.div`
	padding: 10px;
`
