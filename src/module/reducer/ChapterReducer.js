import * as types from './../const/ActionType';

let initialState = {
	chapter: [],
	listChapters: []
};

let ChapterReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_CHAPTER_SUCCESS:
			return {
				...state,
				chapter: action.payload.data
			};
		case types.GET_LIST_CHAPTER_SUCCESS:
			return {
				...state,
				listChapters: action.payload.data
			};
		default:
			return state;
	}
};

export default ChapterReducer;