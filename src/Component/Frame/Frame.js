import React from 'react'

import {
	AddButton,
	SaveButton,
	CancelButton,
	EditButton,
	DeleteButton,
} from 'Styles/Components'
import {
	FrameContainer,
	TitleContainer,
	TextContainer,
	Title,
	EditTitle,
	TimeSpan,
	EditTimeSpan,
	EditTime,
	ButtonContainer,
	TasksContainer,
} from './Frames.styles'

const Frame = ({ data, functions, editing, children }) => {
	const { id, title, timeStart, timeEnd } = data
	const {
		handleAddTask,
		setEditingFrameId,
		handleEditFrame,
		handleDeleteFrame,
	} = functions
	const { editingFrames, editingFrame } = editing

	const [editTitle, setEditTitle] = React.useState(title ?? '')
	const [editTimeStart, setEditTimeStart] = React.useState(timeStart ?? '')
	const [editTimeEnd, setEditTimeEnd] = React.useState(timeEnd ?? '')

	const inputRef = React.useRef()
	React.useEffect(() => {
		if (editingFrame) {
			inputRef.current.focus()
		}
	}, [editingFrame])

	return (
		<FrameContainer>
			<TitleContainer>
				<TextContainer>
					{!editingFrame && <Title>{title}</Title>}
					{editingFrame && (
						<EditTitle
							ref={inputRef}
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
						/>
					)}
					{!editingFrame && (
						<TimeSpan>
							{timeStart}
							{timeEnd && ` - ${timeEnd}`}
						</TimeSpan>
					)}
					{editingFrame && (
						<EditTimeSpan>
							<EditTime
								value={editTimeStart}
								onChange={(e) => setEditTimeStart(e.target.value)}
							/>
							<EditTime
								value={editTimeEnd}
								onChange={(e) => setEditTimeEnd(e.target.value)}
							/>
						</EditTimeSpan>
					)}
				</TextContainer>
				<ButtonContainer>
					{!editingFrames && (
						<AddButton
							onClick={() => {
								handleAddTask({ frame: id })
							}}
						/>
					)}
					{editingFrames && !editingFrame && (
						<React.Fragment>
							<EditButton
								onClick={() => {
									setEditingFrameId(id)
								}}
							/>
							<DeleteButton
								onClick={() => {
									handleDeleteFrame({ id })
								}}
							/>
						</React.Fragment>
					)}
					{editingFrames && editingFrame && (
						<React.Fragment>
							<SaveButton
								onClick={() => {
									handleEditFrame({
										id,
										title: editTitle,
										timeStart: editTimeStart,
										timeEnd: editTimeEnd,
									})
								}}
							/>
							<CancelButton
								onClick={() => {
									setEditingFrameId(null)
								}}
							/>
						</React.Fragment>
					)}
				</ButtonContainer>
			</TitleContainer>
			<TasksContainer>{children}</TasksContainer>
		</FrameContainer>
	)
}

export default Frame
