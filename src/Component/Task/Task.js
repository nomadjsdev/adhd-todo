import React from 'react'

import { TaskContainer, Title } from './Task.styles'

const Task = ({ data }) => {
	const { title } = data

	return (
		<TaskContainer>
			<Title>{title}</Title>
		</TaskContainer>
	)
}

export default Task
