import React from 'react';
import './Task.styles.scss';

class Task extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			completed : null
		}
	}

	componentDidMount(){
		this.setState({
			completed : this.props.completed
		})
	}

	handleClick = () =>{
		this.setState({completed : !this.state.completed}, () => {
			this.props.completedTask(this.props.i, this.state.completed)
		})
	}

	render(){
		return(
			<div className = {`${this.state.completed ? 'strike' : ''} task-bar`}>
				<div className = "">
					{this.props.task}
				</div>
				<div className = "button-container">
					<button className = "button fa glyphicon glyphicon-ok-sign" onClick = {() => this.handleClick ()}/>
					<button className = "button fa glyphicon glyphicon-remove-sign" onClick = {() => this.props.deleteTask(this.props.i)}/>
				</div>
			</div>
		)
	}
}

export default Task;