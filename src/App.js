import React from 'react'
import { View, Panel, Search, FixedLayout, Div, Button } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import Tasks from './panels/Tasks/Tasks'
import AddTask from './panels/Tasks/AddTask'
import Icon24Add from '@vkontakte/icons/dist/24/add'
import './custom.css'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'Tasks',
			tasks : [ 
				{
					name : 'Hello world',
					text : 'First tasks'
				},
				{
					name : 'Hello world',
					text : 'First tasks'
				},
				{
					name : 'Hello world',
					text : 'First tasks'
				}
			],
			search : ''
		};
	}

	onChangeSearch = (search) => { 
		this.setState({ search })
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	addTask = (task) => {
		this.setState({
			tasks : [...this.state.tasks, task]
		})
	}

	get tasks () {
		const search = this.state.search.toLowerCase();
		return this.state.tasks.filter((task) => 
			task.name.toLowerCase().indexOf(search) > -1 || 
			task.text.toLowerCase().indexOf(search) > -1);
	}

	render() {
		return (
			<View activePanel={this.state.activePanel}>
				<Panel id='Tasks'>
					<FixedLayout vertical='top'>
						<Search value={this.state.search} onChange={this.onChangeSearch}/>
					</FixedLayout>
					<Tasks 
						tasks={this.tasks}
					/>
					<FixedLayout vertical='bottom'>
						<Div style={{ float : 'right' }}>
							<Button
								className='FixedBottomButton'
								data-to='AddTask'
								onClick={(e) => this.go(e)}
							>
								<Icon24Add/>
							</Button>
						</Div>
					</FixedLayout>
				</Panel>

				<Panel id='AddTask' theme="white">
					<AddTask 
						addTask={this.addTask}
						go={this.go}
					/>
				</Panel>
			</View>
		);
	}
}

export default App;
