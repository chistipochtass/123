import React from 'react'
import { View, Panel, Search, FixedLayout, Div, Button } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Task from './components/Task'
import EditTask from './components/EditTask'
import Icon24Add from '@vkontakte/icons/dist/24/add'
import Icon24Write from '@vkontakte/icons/dist/24/write'
import { RouteNode, Link } from 'react-router5'
import './custom.css'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks : [ 
				{	
					id : 1,
					name : 'Hello world',
					text : 'First tasks'
				},
				{
					id : 2,
					name : 'Hello world',
					text : 'First tasks'
				},
				{
					id : 3,
					name : 'Hello world',
					text : 'First tasks'
				}
			],
			search : ''
		}
	}

	onChangeSearch = (search) => { 
		this.setState({ search })
	}

	addTask = (task) => {
		task.id = this.state.tasks.length + 1
		this.setState({
			tasks : [...this.state.tasks, task]
		})
	}

	editTask = (newTask) => {
		let newTasks = this.state.tasks.map((task) => {
			if (task.id === newTask.id) {
				task = newTask
			}
			return task
		})
		this.setState({
			tasks : newTasks
		})
	}

	get tasks () {
		const search = this.state.search.toLowerCase()
		return this.state.tasks.filter((task) => 
			task.name.toLowerCase().indexOf(search) > -1 || 
			task.text.toLowerCase().indexOf(search) > -1)
	}

	get task () {
		const id = Number(this.props.route.params.id)
		return this.state.tasks.filter((task) =>
			task.id === id
		)
	}

	render() {
		let {
			route,
			router
		} = this.props

		const activePanel = route.name

		return (
			<View activePanel={activePanel}>
				<Panel id='tasks'>
					<FixedLayout vertical='top'>
						<Search value={this.state.search} onChange={this.onChangeSearch}/>
					</FixedLayout>
					<Tasks 
						tasks={this.tasks}
					/>
					<FixedLayout vertical='bottom'>
						<Div style={{ float : 'right' }}>
							<Link
								routeName={'add'}
							>
								<Button
									className='FixedBottomButton'
								>
									<Icon24Add/>
								</Button>
							</Link>
						</Div>
					</FixedLayout>
				</Panel>

				<Panel id='task'>
					<Task task={this.task[0]}/>
					<FixedLayout vertical='bottom'>
						<Div style={{ float : 'right' }}>
							<Link
								routeName={'edit'}
								routeParams={{id : (typeof this.task[0] !== 'undefined') ? this.task[0].id : 0}}
							>
								<Button
									className='FixedBottomButton'
								>
									<Icon24Write/>
								</Button>
							</Link>
						</Div>
					</FixedLayout>
				</Panel>

				<Panel id='add' theme="white">
					<AddTask 
						router={router}
						addTask={this.addTask}
					/>
				</Panel>

				<Panel id="edit" theme="white">
					<EditTask 
						router={router}
						task={this.task[0]}
						editTask={this.editTask}
					/>
				</Panel>
			</View>
		)
	}
}

export default (props) => (
    <RouteNode nodeName="">
        {({ route }) => <App route={route} {...props}/>}
    </RouteNode>
)
