import React from 'react'

import {
	FrameContainer,
	TitleContainer,
	Title,
	TimeSpan,
	TasksContainer,
} from './Frames.styles'

const Frame = ({ data, children }) => {
	const { title, timeStart, timeEnd } = data

	return (
		<FrameContainer>
			<TitleContainer>
				<Title>{title}</Title>
				<TimeSpan>
					({timeStart}
					{timeEnd && ` - ${timeEnd}`})
				</TimeSpan>
			</TitleContainer>
			<TasksContainer>{children}</TasksContainer>
		</FrameContainer>
	)
}

export default Frame
