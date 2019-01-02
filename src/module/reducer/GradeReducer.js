import * as types from './../const/ActionType';

let initialState = {
	classes: []
};

let GradeReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CLASS_IN_GRADE_SUCCESS:
			return {
				...state,
				classes: action.payload.data
			};
		default:
			return state;
	}
};

export default GradeReducer;