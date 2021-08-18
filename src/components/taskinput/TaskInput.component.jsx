import React from 'react';
import './TaskInput.styles.scss';
import {firestore, auth} from '../../firebase/Firebase.utils';

class TaskInput extends React.Component{
	constructor(){
		super();
			this.state = {
				value : {
					"task" : '',
					"completed" : false
				},
				user : null
		}
	}

	unsubscribe = null;

	componentDidMount(){
		this.unsubscribe = auth.onAuthStateChanged(async userAuth =>{
			this.setState({user : userAuth});
		})
	}

	componentWillUnmount(){
		this.unsubscribe();
	}

	handleSubmit = async (event) =>{
		if(this.state.user && this.state.value.task.trim() !== "")
		{
			const userRef = await firestore.doc(`users/${this.state.user.uid}`);
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

export default TaskInput;