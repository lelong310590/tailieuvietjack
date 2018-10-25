import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ListDocReducer from './ListDocReducer';
import UserReducer from './UserReducer';

const MainReducer = combineReducers({
	AuthReducer,
	ListDocReducer,
	UserReducer
});

export default MainReducer;