import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

import {
	AddButton,
	SaveButton,
	CancelButton,
	EditButton,
	DeleteButton,
	MoveHandle,
	ButtonContainer,
} from 'Styles/Components'
import {
	FrameContainer,
	TitleContainer,
	TextContainer,
	Title,
	EditTitle,
	TimeSpan,
	EditTime,
	TasksContainer,
} from './Frames.styles'

const Frame = ({ index, data, functions, editing, children }) => {
	const { id, title, timeStart } = data
	const {
		handleAddTask,
		setEditingFrameId,
		handleEditFrame,
		handleDeleteFrame,
	} = functions
	const { editingFrames, editingFrame } = editing

	const [editTitle, setEditTitle] = React.useState(title)
	const [editTimeStart, setEditTimeStart] = React.useState(timeStart)

	const inputRef = React.useRef()
	React.useEffect(() => {
		if (editingFrame) {
			inputRef.current.focus()
		}
	}, [editingFrame])

	return (
		<Draggable draggableId={`frame-${id.toString()}`} index={index}>
			{(provided) => (
				<FrameContainer ref={provided.innerRef} {...provided.draggableProps}>
					<TitleContainer>
						<MoveHandle
							{...provided.dragHandleProps}
							style={{ display: editingFrames ? 'flex' : 'none' }}
						/>
						<TextContainer>
							{!editingFrame && <Title>{title}</Title>}
							{editingFrame && (
								<EditTitle
									ref={inputRef}
									value={editTitle}
									onChange={(e) => setEditTitle(e.target.value)}
								/>
							)}
							{!editingFrame && <TimeSpan>{timeStart}</TimeSpan>}
							{editingFrame && (
								<EditTime
									value={editTimeStart}
									onChange={(e) => setEditTimeStart(e.target.value)}
								/>
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
										disabled={editTitle ? false : true}
										onClick={() => {
											handleEditFrame({
												id,
												title: editTitle,
												timeStart: editTimeStart,
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
			)}
		</Draggable>
	)
}

export default Frame
