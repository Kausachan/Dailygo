import React from 'react';
import SignIn from '../../components/signin/SignIn.component';
import './SignIn_SignUp.styles.scss';
import SignUp from '../../components/signup/SignUp.component';

const SignIn_SignUp = () =>{
	return(
		<div className = "signin-in-and-sign-up">
			<SignIn/>
			<SignUp/>
		</div>
		)
}

export default SignIn_SignUp;