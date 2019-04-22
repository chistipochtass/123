import React from 'react'
import { PanelHeader, FormLayout, Textarea, Input, FixedLayout, Button, Div } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Icon24Done from '@vkontakte/icons/dist/24/done'

class AddTask extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name : '',
			text : ''
		};
	}

	onClickAddTask = (e) => {
		let {
			go,
			addTask
		} = this.props

		let {
			name,
			text
		} = this.state

		if (name !== '' && text !== '') {
			addTask({
				name, text
			})
			go(e)
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
			go
		} = this.props

		console.log(this.state)

		return (
			<div>
                <PanelHeader
					left={
						<PanelHeaderBack
							data-to='Tasks'
							onClick={(e) => go(e)}
						/>
					}
				>
                Добавление
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
							onClick={(e) => this.onClickAddTask(e)}
						>
							<Icon24Done/>
						</Button>
					</Div>
				</FixedLayout>
            </div>
		);
	}
}

export default AddTask;
