import styled from 'styled-components'

import Colors from 'Styles/Colors'
import { Button } from 'Styles/Components'

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
	width: calc(100% - 92px);
	justify-content: space-between;
`

export const Title = styled.h2`
	font-size: 2rem;
	margin: 5px 10px 0 0;
`

export const EditTitle = styled.input.attrs({ type: 'text' })`
	background-color: ${Colors.grey};
	color: ${Colors.white};
	border: none;
	border-bottom: 2px solid ${Colors.white};
	margin: 0 20px 0 12px;
	padding-left: 3px;
	font-size: 1.5rem;

	&:focus {
		outline: none;
	}
`

export const TimeSpan = styled.span`
	font-size: 1.2rem;
`

export const EditTimeSpan = styled.div`
	max-width: 100px;
	margin-right: 10px;
`

export const EditTime = styled(EditTitle)`
	margin: 0 5px;
	max-width: 100px;
`

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 92px;
`

export const AddButton = styled(Button)`
	border: 2px solid ${Colors.highlight};
	background-color: ${Colors.highlight};
	font-size: 1.9rem;

	&:after {
		content: '+';
	}
`

export const TasksContainer = styled.div`
	padding: 10px;
`
