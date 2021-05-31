import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {auth} from '../../firebase/Firebase.utils';
import './Header.styles.scss';



const Header = ({bingos, currentUser, history}) =>{
	return(
		<div className = "header font">
			<Link className = {`${currentUser ? '' : 'no-click'} displayName font`} to = '/home'>
				DailyGo
			</Link>
			<div className = "option font">
			{
				currentUser ?
				<div className = "options"> Bingos {`${bingos}`} </div>
				:
				null
			}
				<div> 
					{
						currentUser ?
						<div className = "options options-clickable font" onClick = {() => {
							history.push('/')
							auth.signOut();
						}}> SIGN OUT </div>
						:
						null
					}
				</div>
			</div>
		</div>
		)
}

export default withRouter(Header);