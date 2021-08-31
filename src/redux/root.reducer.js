import userReducer from './user/user.reducer';
import {combineReducers} from 'redux';
import loaderReducer from './loader/loader.reducer';

export default combineReducers({
	user : userReducer,
	loader : loaderReducer
})