import React from 'react'
import { List, Cell, PanelHeader, platform, ANDROID } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

class Tasks extends React.Component {

	render() {

        let {
            tasks,
            router,
            setCurrentTaskId
        } = this.props

        const osname = platform()

		return (
			<div>
                <PanelHeader>
                    Задачи
                </PanelHeader>
                <List style={{ paddingTop : (osname === ANDROID) ? 56 : 48 }}>
                    {
                        tasks.map((task, index) => (
                            <Cell
                                multiline
                                expandable
                                key={index}
                                onClick={()=> {
                                        setCurrentTaskId(task.id)
                                        router.navigate('task', { id : task.id })
                                    } 
                                }
                            >
                                {task.name}
                            </Cell>
                        ))
                    }
                </List>
            </div>
		);
	}
}

export default Tasks;
