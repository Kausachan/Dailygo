const INITIAL_STATE = {
	loader : false
}

const loaderReducer = (state  = INITIAL_STATE, action) =>
{
	switch(action.type)
	{
		case "SET_LOADER" :
			return{
				...state,
				loader : action.payload
			}
		default :
			return state
	}
}

export default loaderReducer;