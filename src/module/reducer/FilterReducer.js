import * as types from './../const/ActionType';

let initialState = {
	selectedGrade: 0,
	selectedClass: 0,
	selectedSubject: 0,
	selectedChapter: 0
};

let FilterReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.CHANGE_GRADE:
			return {
				...state,
				selectedGrade: parseInt(action.grade)
			};
		case types.CHANGE_CLASS:
			return {
				...state,
				selectedClass: parseInt(action.classId)
			};
		case types.CHANGE_SUBJECT:
			return {
				...state,
				selectedSubject: parseInt(action.subject)
			};
		case types.CHANGE_CHAPTER:
			return {
				...state,
				selectedChapter: parseInt(action.chapter)
			};
		default:
			return state;
	}
};

export default FilterReducer;