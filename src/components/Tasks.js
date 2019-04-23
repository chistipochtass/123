import React from 'react'
import { List, Cell, PanelHeader } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

class Tasks extends React.Component {

	render() {

        let {
            tasks,
            router
        } = this.props


		return (
			<div>
                <PanelHeader>
                    Задачи
                </PanelHeader>
                <List style={{ paddingTop : 60 }}>
                    {
                        tasks.map((task, index) => (
                            <Cell
                                multiline
                                expandable
                                key={index}
                                onClick={()=>router.navigate('task', { id : task.id })}
                            >
                                <b>{task.name}</b>
                                <p>
                                    {task.text}
                                </p>
                            </Cell>
                        ))
                    }
                </List>
            </div>
		);
	}
}

export default Tasks;
