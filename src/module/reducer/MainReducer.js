import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import ListDocReducer from './ListDocReducer';
import UserReducer from './UserReducer';
import MenuReducer from './MenuReducer';
import ClassesReducer from './ClassesReducer';
import SubjectReducer from './SubjectReducer';
import PriceReducer from './PriceReducer';
import UserDocument from './UserDocument';
import DocReducer from './DocReducer';
import ChapterReducer from './ChapterReducer';
import ThematicReducer from './ThematicReducer';

const MainReducer = combineReducers({
	AuthReducer,
	ListDocReducer,
	UserReducer,
	MenuReducer,
	ClassesReducer,
	SubjectReducer,
	PriceReducer,
	UserDocument,
	DocReducer,
	ChapterReducer,
	ThematicReducer
});

export default MainReducer;