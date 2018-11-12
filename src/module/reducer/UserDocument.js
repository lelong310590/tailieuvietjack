import * as types from './../const/ActionType';

let initialState = {
	docs: []
};

let UserDocument = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_USER_DOCUMENT_SUCCESS:
			return {
				...state,
				docs: action.payload.data
			};
		default:
			return state;
	}
};

export default UserDocument;