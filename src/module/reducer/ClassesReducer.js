import * as types from './../const/ActionType';

let initialState = {
	classes: []
};

let ClassesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CLASSES_SUCCESS:
			let classes = action.payload.data;
			return {
				...state,
				classes
			};
		default:
			return state;
	}
} ;

export default ClassesReducer;