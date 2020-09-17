import { combineReducers } from 'redux';
import authReducer from './auth';
import activitiesReducer from './activities'
import appReducer from './app'


export default combineReducers({
	auth: authReducer,
	activities: activitiesReducer,
	app: appReducer
})