import React from 'react';
import './TaskInput.styles.scss';
import {connect} from 'react-redux';
import {firestore} from '../../firebase/Firebase.utils';

class TaskInput extends React.Component{
	constructor(){
		super();
			this.state = {
				value : {
					"task" : '',
					"completed" : false
				}
		}
	}

	handleSubmit = async (event) =>{
		if(this.props.currentUser && this.state.value.task.trim() !== "")
		{
			const userRef = await firestore.doc(`users/${this.props.currentUser.id}`);
			const snapshot = await userRef.get();
			const data = await snapshot.data();
			const tasks = data.tasks;
			tasks.push({...this.state.value})
			userRef.update({
				"tasks" : tasks
			})
		}
		this.setState({value : {
			task : ''
		}})
	}

	handleChange = (event) =>{
		this.setState({ value : {task : event.target.value,
			completed : false
		}})
	}

	handlePress = (event) =>{
		if(event.which === 13) this.handleSubmit();
	}

	render(){
		return(
			<div className = "task-input-button">
				<div className = "add-task">Add Task</div>
				<input className = "task-input" type = "text" value = {this.state.value.task} onKeyPress = {this.handlePress} onChange = {this.handleChange}/>
				<button className = "add-button glyphicon glyphicon-plus-sign" onClick = {this.handleSubmit}/>
			</div>
		)
	}
}

const MapStateToProps = ({user}) => ({
	currentUser : user.currentUser
})

export default connect(MapStateToProps)(TaskInput);