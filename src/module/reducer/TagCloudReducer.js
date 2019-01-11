import * as types from './../const/ActionType';

let initialState = {
	tags: [],
	tagsFooter: [],
	documents: [],
	singleTag: {
		name: ''
	}
};

let TagCloudReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_TAG_FOOTER_SUCCESS:
			let tags = [];
			if (action.payload.data.length > 0) {
				if (action.payload.data[0].id !== null) {
					tags = action.payload.data
				}
			}
			return {
				...state,
				tagsFooter: tags
			};

		case types.GET_DOCUMENT_BY_TAG_SUCCESS:
			return {
				...state,
				documents: action.payload.data.document.data,
				singleTag: action.payload.data.tag
			};

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