import * as types from './../const/ActionType';

let initialState = {
	classes: [],
	featuredDoc: []
};

let ClassesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CLASSES_SUCCESS:
			let classes = action.payload.data;
			return {
				...state,
				classes
			};

		case types.GET_MOST_VIEW_SUCCESS:
			return {
				...state,
				featuredDoc: action.payload.data
			};

		default:
			return state;
	}
} ;

export default ClassesReducer;