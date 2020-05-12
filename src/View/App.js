import React from 'react'

import db from 'Db'

import Frame from 'Component/Frame'
import Task from 'Component/Task'

const defaultFrames = [
	{ title: 'First thing', timeStart: '0700', timeEnd: null },
	{ title: 'Morning', timeStart: '0800', timeEnd: '1300' },
	{ title: 'Afternoon', timeStart: '1300', timeEnd: '1800' },
	{ title: 'Evening', timeStart: '1800', timeEnd: '2300' },
	{ title: 'Last thing', timeStart: '2400', timeEnd: null },
]

const defaultTasks = [
	{ title: 'Stretch', frame: 1, complete: false },
	{ title: 'Shower', frame: 1, complete: false },
	{ title: 'Breakfast', frame: 2, complete: false },
	{ title: 'Take medication', frame: 2, complete: false },
]

const App = () => {
	const [useDefault, setUseDefault] = React.useState(false)

	const [frames, setFrames] = React.useState([])
	React.useEffect(() => {
		db.table('frames')
			.toArray()
			.then((frames) => {
				if (frames.length === 0) {
					setUseDefault(true)
					// If there are no frames in the DB, use default data
					for (const frame in defaultFrames) {
						db.table('frames').add(defaultFrames[frame])
						setFrames((prevFrames) => [...prevFrames, defaultFrames[frame]])
					}
				} else {
					setFrames(frames)
				}
			})
	}, [])

	const [tasks, setTasks] = React.useState([])
	React.useEffect(() => {
		db.table('tasks')
			.toArray()
			.then((tasks) => {
				if (tasks.length === 0 && useDefault) {
					// If there are no tasks in the DB and Frames were populated from defaults, use default data for tasks
					for (const task in defaultTasks) {
						db.table('tasks').add(defaultTasks[task])
						setTasks((prevTasks) => [...prevTasks, defaultTasks[task]])
					}
				} else {
					setTasks(tasks)
				}
			})
	}, [useDefault])

	return (
		<React.Fragment>
			<h1>App</h1>
			{frames &&
				frames.map((frame, index) => (
					<Frame key={`frame-${index}`} data={frame}>
						{tasks
							.filter((task) => task.frame === frame.id)
							.map((task, index) => (
								<Task key={`task-${index}`} data={task} />
							))}
					</Frame>
				))}
		</React.Fragment>
	)
}

export default App
