import React from 'react'

const Task = ({ data }) => {
	const { title } = data

	return (
		<div>
			<h3>{title}</h3>
		</div>
	)
}

export default Task
