import React from 'react';
import './CustomButton.styles.scss';

const CustomButton = ({children, IsGoogleSignin, ...other}) =>{
	return(
		<button className = {`${IsGoogleSignin ? "google-sign-in" : ''} custom-button`} {...other}>
			{children}
		</button>
		)
	}

export default CustomButton;