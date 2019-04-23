import React from 'react'
import { PanelHeader, FormLayout, Textarea, Input, FixedLayout, Button, Div } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import { Link } from 'react-router5'

class EditTask extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			id : null,
			name : '',
			text : ''
		};
	}

	componentDidMount() {
		let {
			task
		} = this.props

		this.setState({ ...task })
	}

	onClickEditTask = () => {
		let {
			editTask,
			router
		} = this.props

		let {
			id,
			name,
			text
		} = this.state

		if (name !== '' && text !== '') {
			editTask({
				id, name, text
			})
			router.navigateToDefault()
        }

	}

	onChangeNameTask = (e) => {
		const name = e.target.value
		this.setState({ name })
	}

	onChangeTextTask = (e) => {
		const text = e.target.value
		this.setState({ text })
	}

	render() {

		let {
			task
		} = this.props

		return (
			<div>
				{
					typeof task !== 'undefined' &&
					<div>
						<PanelHeader
							left={
								<Link
									routeName={'task'}
									routeParams={{id : task.id}}
								>
									<PanelHeaderBack />
								</Link>
							}
						>
						Редактирование
						</PanelHeader>
						<FormLayout>
							<Input 
								onChange={this.onChangeNameTask}
								type='text'
								value={this.state.name}
								placeholder='Напиши, как называется задача' 
							/>
							<Textarea 
								onChange={this.onChangeTextTask}
								value={this.state.text}
								placeholder='Напиши, чтобы ты хотел сделать' />
						</FormLayout>
						<FixedLayout vertical='bottom'>
							<Div style={{ float : 'right' }}>
								<Button
									className='FixedBottomButton'
									data-to='Tasks'
									onClick={() => this.onClickEditTask()}
								>
									<Icon24Done/>
								</Button>
							</Div>
						</FixedLayout>
					</div>
				}
            </div>
		);
	}
}

export default EditTask;
