import React from 'react'

const Frame = ({ data, children }) => {
	const { title, timeStart, timeEnd } = data

	return (
		<div>
			<div>
				<h2>{title}</h2>
				<span>
					({timeStart}
					{timeEnd && ` - ${timeEnd}`})
				</span>
			</div>
			<React.Fragment>{children}</React.Fragment>
		</div>
	)
}

export default Frame
