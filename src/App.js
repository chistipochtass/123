import React from 'react'
import { View, Panel, Search, FixedLayout, Div, Button, platform, ANDROID, Root } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Task from './components/Task'
import EditTask from './components/EditTask'
import Icon24Add from '@vkontakte/icons/dist/24/add'
import Icon24Write from '@vkontakte/icons/dist/24/write'
import { RouteNode } from 'react-router5'
import Icon24Delete from '@vkontakte/icons/dist/24/delete'
import './custom.css'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			tasks : [ 
				{	
					id : 1,
					name : 'Домашнее задание',
					text : 'Сделать математику к школе'
				},
				{
					id : 2,
					name : 'Выпить воду',
					text : 'Буду пить воду каждый час'
				},
				{
					id : 3,
					name : 'Написать Васе',
					text : 'Надо написать Васе, чтобы он написал Свете'
				}
			],
			currentTaskId : null,
			search : '',
			removable : false
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

	deleteTask = (id) => {
		let newTasks = this.state.tasks.filter((task) => task.id !== id)
		this.setState({ 
			tasks : newTasks
		})
	}

	onRemovableTasks = () => this.setState({ removable : !this.state.removable })

	setCurrentTaskId = (currentTaskId) => this.setState({ currentTaskId })

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
		const id = Number(this.props.route.params.id) || this.state.currentTaskId
		return this.state.tasks.filter((task) =>
			task.id === id
		)
	}

	render() {
		let {
			route,
			router
		} = this.props

		const osname = platform()
		const activeView = (route.name === 'add') ? 'addView' : 'tasksView'
		const activePanel = route.name

		return (
			<Root activeView={activeView}>
				<View activePanel={activePanel} id='tasksView'>
					<Panel id='tasks'>
						<FixedLayout vertical='top'>
							<Search value={this.state.search} onChange={this.onChangeSearch}/>
						</FixedLayout>
						<Tasks 
							router={router}
							tasks={this.tasks}
							removable={this.state.removable}
							onRemovableTasks={this.onRemovableTasks}
							setCurrentTaskId={this.setCurrentTaskId}
							deleteTask={this.deleteTask}
						/>
						<FixedLayout vertical='bottom'>
							{
								osname === ANDROID ?
								<Div style={{ float : 'right' }}>
									<Button
										className='FixedBottomButton'
										onClick={()=>router.navigate('add')}
									>
										<Icon24Add/>
									</Button>
								</Div>
								:
								<Div>
									<Button
										size="xl"
										onClick={()=>router.navigate('add')}
									>
										Новая задача
									</Button>
								</Div>
							}
							{
								osname === ANDROID ? 
								<Div>
									<Button
										className='FixedBottomButton'
										onClick={() => this.onRemovableTasks()}
									>
										<Icon24Delete/>
									</Button>
								</Div>
								:
								false
							}
						</FixedLayout>
					</Panel>

					<Panel id='task'>
						<Task 
							router={router}
							task={this.task[0]}
						/>
						<FixedLayout vertical='bottom'>
							{
								osname === ANDROID ?
								<Div style={{ float : 'right' }}>
									<Button
										className='FixedBottomButton'
										onClick={()=>router.navigate('edit', { id : this.task[0].id })}
									>
										<Icon24Write/>
									</Button>
								</Div>
								:
								<Div>
									<Button
										size="xl"
										onClick={()=>router.navigate('edit', { id : this.task[0].id })}
									>
										Редактировать
									</Button>
								</Div>
							}
						</FixedLayout>
					</Panel>

					<Panel id="edit" theme="white">
						<EditTask 
							router={router}
							task={this.task[0]}
							editTask={this.editTask}
						/>
					</Panel>
				</View>
				<View activePanel={activePanel} id='addView'>
					<Panel id='add' theme="white">
							<AddTask 
								router={router}
								addTask={this.addTask}
							/>
					</Panel>
				</View>
			</Root>
		)
	}
}

export default (props) => (
    <RouteNode nodeName="">
        {({ route }) => <App route={route} {...props}/>}
    </RouteNode>
)
