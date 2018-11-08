import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ListDocReducer from './ListDocReducer';
import UserReducer from './UserReducer';
import MenuReducer from './MenuReducer';
import ClassesReducer from './ClassesReducer';
import SubjectReducer from './SubjectReducer';
import PriceReducer from './PriceReducer';

const MainReducer = combineReducers({
	AuthReducer,
	ListDocReducer,
	UserReducer,
	MenuReducer,
	ClassesReducer,
	SubjectReducer,
	PriceReducer
});

export default MainReducer;