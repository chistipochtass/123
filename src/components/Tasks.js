import React from 'react'
import { List, Cell, PanelHeader } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { Link } from 'react-router5'

class Tasks extends React.Component {

	render() {

        let {
            tasks 
        } = this.props


		return (
			<div>
                <PanelHeader>
                    Задачи
                </PanelHeader>
                <List style={{ paddingTop : 60 }}>
                    {
                        tasks.map((task, index) => (
                            <Link
                                    routeName={'task'}
                                    routeParams={{ id : task.id }}
                                    key={index}
                            >
                                <Cell
                                    multiline
                                    expandable
                                >
                                        <b>{task.name}</b>
                                        <p>
                                            {task.text}
                                        </p>
                                </Cell>
                            </Link>
                        ))
                    }
                </List>
            </div>
		);
	}
}

export default Tasks;
