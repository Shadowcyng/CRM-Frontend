import { combineReducers } from 'redux';
import { eventReducer } from './EventReducer';
import { UserReducer } from './UserReducer';

const reducer = combineReducers({
	user: UserReducer,
	event: eventReducer,
});

export default reducer;
