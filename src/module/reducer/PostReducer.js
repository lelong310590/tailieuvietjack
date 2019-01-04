import * as types from './../const/ActionType';

let initialState = {
	post: {}
};

let PostReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_POST_SUCCESS:
			return {
				...state,
				post: action.payload.data
			};
		default:
			return state;
	}
};

export default PostReducer;