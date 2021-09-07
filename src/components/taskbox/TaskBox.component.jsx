import React from 'react';
import './TaskBox.styles.scss';
import Task from '../task/Task.component';
import {auth, firestore} from '../../firebase/Firebase.utils';
import {connect} from 'react-redux';
import Loader from 'react-loader';

class TaskBox extends React.Component{

	deleteTask = async (i) =>{
		const arr = await this.props.currentUser.tasks.filter((task, ind) => {return (ind !== i+1)})
		const userRef = await firestore.doc(`users/${this.props.currentUser.id}`)
		userRef.update({
			tasks : arr
		})
	}

	completedTask = (i, val) =>{
		const arr = this.props.currentUser.tasks.map((task, ind) =>{
			if(ind === i+1) return {...task, completed : val}
			return {...task} 
		})
		const userRef = firestore.doc(`users/${this.props.currentUser.id}`)
		userRef.update({
			tasks : arr
		})
	}

	render(){
		const {currentUser} = this.props;
		if(!currentUser)
		 return (
		 	<div className = "task-box">
		 		<Loader loaded={false} lines={10} length={7} width={5} radius={15}
	            corners={1} rotate={0} direction={1} color="#000" speed={1.5}
	            trail={60} shadow={true} hwaccel={false} className="spinner"
	            zIndex={2e9} top="50%" left="50%" scale={1.00}
	            loadedClassName="loadedContent" />
	        </div>)
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

const MapStateToProps = ({user}) => ({
	currentUser : user.currentUser
})

export default connect(MapStateToProps)(TaskBox);