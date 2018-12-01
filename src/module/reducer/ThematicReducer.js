import * as types from './../const/ActionType';

let initialState = {
	thematic: []
};

let ThematicReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_THEMATIC_SUCCESS:
			return {
				...state,
				thematic: action.payload.data
			};
		default:
			return state;
	}
};

export default ThematicReducer;