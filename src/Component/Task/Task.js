import React from 'react'

import {
	TaskContainer,
	TitleContainer,
	Complete,
	Title,
	ControlContainer,
	EditButton,
	DeleteButton,
} from './Task.styles'

const Task = ({ data, functions }) => {
	const { id, title, complete } = data
	const { handleMarkComplete, handleEdit, handleDelete } = functions

	return (
		<TaskContainer>
			<TitleContainer
				onClick={() => {
					handleMarkComplete(id, !complete)
				}}
			>
				<Complete complete={complete} />
				<Title complete={complete}>{title}</Title>
			</TitleContainer>
			<ControlContainer>
				<EditButton
					onClick={() => {
						handleEdit(id)
					}}
				/>
				<DeleteButton
					onClick={() => {
						handleDelete(id)
					}}
				/>
			</ControlContainer>
		</TaskContainer>
	)
}

export default Task
