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
import TreeReducer from './TreeReducer';
import TagCloudReducer from './TagCloudReducer';

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
	ThematicReducer,
	TreeReducer,
	TagCloudReducer
});

export default MainReducer;