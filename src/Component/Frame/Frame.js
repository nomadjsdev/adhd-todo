import React from 'react'

import {
	FrameContainer,
	TitleContainer,
	TextContainer,
	Title,
	TimeSpan,
	TasksContainer,
	AddTaskButton,
} from './Frames.styles'

const Frame = ({ data, functions, children }) => {
	const { id, title, timeStart, timeEnd } = data
	const { handleAddTask } = functions

	return (
		<FrameContainer>
			<TitleContainer>
				<TextContainer>
					<Title>{title}</Title>
					<TimeSpan>
						({timeStart}
						{timeEnd && ` - ${timeEnd}`})
					</TimeSpan>
				</TextContainer>
				<AddTaskButton
					onClick={() => {
						handleAddTask({ title: 'Test', frame: id })
					}}
				/>
			</TitleContainer>
			<TasksContainer>{children}</TasksContainer>
		</FrameContainer>
	)
}

export default Frame
