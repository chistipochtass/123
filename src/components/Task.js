import React from 'react'
import { PanelHeader, Header, Div, Group } from '@vkontakte/vkui'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'

function Task(props) {	
	
	const task = props.task
	const router = props.router

	return (
		<div>
           <PanelHeader
				left={
					<PanelHeaderBack
						onClick={()=>router.navigate('tasks')}
					/>
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
