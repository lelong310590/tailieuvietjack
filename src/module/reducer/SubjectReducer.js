import * as types from './../const/ActionType';

let initialState = {
	subjects: [],
	subjectInClass: [],
};

let SubjectReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_SUBJECT_SUCCESS:
			return {
				...state,
				subjects: action.payload.data
			};
		case types.GET_SUBJECT_VIA_CLASSES_SUCCESS:
			return {
				...state,
				subjectInClass: action.payload.data
			};
		default:
			return state;
	}
};

export default SubjectReducer;