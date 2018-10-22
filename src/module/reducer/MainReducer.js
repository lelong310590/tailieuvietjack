import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ListDocReducer from './ListDocReducer';

const MainReducer = combineReducers({
	AuthReducer,
	ListDocReducer
});

export default MainReducer;