import React from 'react';
import TaskBox from '../../components/taskbox/TaskBox.component';
import './HomePage.styles.scss';
import TaskInput from '../../components/taskinput/TaskInput.component';

const HomePage = () =>{
	return(
			<div className = "home-task-box">
				<div className = "home-text">Task Box</div>
				<div className = "task-input-align">
					<TaskBox/>
				</div>
				<div className = "home-task-input">
					<TaskInput/>
				</div>
			</div>
		)
}

export default HomePage;