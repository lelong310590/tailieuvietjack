import * as types from './../const/ActionType';

let initialState = {
	tags: []
};

let TagCloudReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_TAG_CLOUD_SUCCESS:
			return {
				...state,
				tags: action.payload.data
			};
		default:
			return {...state}
	}
};

export default TagCloudReducer;