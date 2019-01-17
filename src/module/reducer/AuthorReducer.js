import * as types from './../const/ActionType';

let initialState = {
	user: {},
	documents: {
		data: []
	}
};

let AuthorReducer = (state = initialState, action) => {
	switch (action.type) {

		case types.GET_AUTHOR_SUCCESS:
			return {
				...state,
				user: action.payload.data.user,
				documents: action.payload.data.documents
			};

		default:
			return state;
	}
};

export default AuthorReducer;