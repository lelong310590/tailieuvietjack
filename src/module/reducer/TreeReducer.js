import * as types from './../const/ActionType';

let initialState = {
	tree: []
};

let TreeReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_TREE_SUCCESS:
			return {
				...state,
				tree: action.payload.data
			};
		default:
			return state;
	}
};

export default TreeReducer;