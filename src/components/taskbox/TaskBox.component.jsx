import React from 'react';
import './TaskBox.styles.scss';
import Task from '../task/Task.component';
import {auth, firestore} from '../../firebase/Firebase.utils';

class TaskBox extends React.Component{
	constructor(){
		super();
		this.state = {
			currentUser : {}
		}
	}

	unsubscribe = null;
	unsubscribe_snap = null;

	componentDidMount(){
		this.unsubscribe = auth.onAuthStateChanged(async userAuth =>{
			if(userAuth)
			{
				const userRef = await firestore.doc(`users/${userAuth.uid}`);
				this.unsubscribe_snap = await userRef.onSnapshot(snapshot =>{
					this.setState({
						currentUser : {...snapshot.data()},
						userRef
					})
				})
			}
		})
	}

	componentWillUnmount(){
		this.unsubscribe();
		this.unsubscribe_snap();
	}

	deleteTask = (i) =>{
		const arr = this.state.currentUser.tasks.filter((task, ind) => {return (ind !== i+1)})
		this.state.userRef.update({
			tasks : arr
		})
	}

	completedTask = (i, val) =>{
		const arr = this.state.currentUser.tasks.map((task, ind) =>{
			if(ind === i+1) return {...task, completed : val}
			return {...task} 
		})
		this.state.userRef.update({
			tasks : arr
		})
	}

	render(){
		const {currentUser} = this.state;
		return(
			<div className = "task-box">
				<div>
					{
						(Object.keys(currentUser).length > 0 && currentUser.tasks.length > 1) ?
							(
								currentUser.tasks
								.filter((task, i) => {return (i > 0)})
								.map((task, i) =>{
									return <Task key = {i} i = {i} completedTask = {this.completedTask} completed = {task.completed} task = {task.task} deleteTask = {this.deleteTask}/>
								})
							)
						:
							Object.keys(currentUser).length === 0 || currentUser.tasks.length === 1 ?
								(<h1 className = "no-task"> No tasks Added </h1>)
							:
							null
					}
				</div>
			</div>
			)
	}
}

export default TaskBox;