import React from 'react'
import { PanelHeader, Header, Div, Group } from '@vkontakte/vkui'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import { Link } from 'react-router5'

function Task(props) {	
	const task = props.task
	return (
		<div>
           <PanelHeader
				left={
					<Link
						routeName={'tasks'}
					>
						<PanelHeaderBack/>
					</Link>
				}
			>
            Задача
            </PanelHeader>
			{
				typeof task !== 'undefined' &&
				<Group>
					<Header>{task.name}</Header>
					<Div>{task.text}</Div>
				</Group>
			}
        </div>
	)
}

export default Task
