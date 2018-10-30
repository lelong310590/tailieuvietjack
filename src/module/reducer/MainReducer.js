import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ListDocReducer from './ListDocReducer';
import UserReducer from './UserReducer';
import MenuReducer from './MenuReducer';

const MainReducer = combineReducers({
	AuthReducer,
	ListDocReducer,
	UserReducer,
	MenuReducer
});

export default MainReducer;