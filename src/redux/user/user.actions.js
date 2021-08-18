import {actionTypes} from '../user.actionTypes';

export const setUserAction = (user) =>({
	type : actionTypes.SET_CURRENT_USER,
	payload : user
})