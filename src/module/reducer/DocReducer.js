import * as types from './../const/ActionType';

let initialState = {
	doc: {
		docInfo: {},
		currentTags: []
	}
};

let DocReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_DOCUMENT_INFO_SUCCESS:
			return {
				...state,
				doc: action.payload.data
			};
		default:
			return state;
	}
} ;

export default DocReducer;