import React from 'react'
import { List, Cell, PanelHeader, platform, ANDROID, HeaderButton } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Icon24Delete from '@vkontakte/icons/dist/24/delete'

class Tasks extends React.Component {
	render() {

        let {
            tasks,
            router,
            setCurrentTaskId,
            onRemovableTasks,
            deleteTask,
            removable
        } = this.props

        const osname = platform()

		return (
			<div>
                <PanelHeader
                    left={
                        osname === ANDROID ?
                        false
                        :
                        <HeaderButton 
                            onClick={() => onRemovableTasks()}
                        >
                            <Icon24Delete/>
                        </HeaderButton>
                    }
                >
                    Задачи
                </PanelHeader>
                <List style={{ paddingTop : (osname === ANDROID) ? 56 : 48 }}>
                    {
                        tasks.map((task, index) => (
                            <Cell
                                multiline
                                expandable
                                removable={removable}
                                key={index}
                                onRemove={() => deleteTask(task.id)}
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
