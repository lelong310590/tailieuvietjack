import * as types from './../const/ActionType';

let initialState = {
	classes: [],
	docTypes: [],
	subjects: [],
	chapters: [],
	keywords: '',
	selectedDocTypes: 0,
	selectedClasses: 0,
	selectedSubject: 0,
	selectedFormat: 0,
	selectedPrice: 0,
	selectedChapter: 0,
	documents: {
		data: []
	},
	viewStyle: 'list'
};

let FilterBarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_FILTER_BAR_CLASS_SUCCESS:
			return {
				...state,
				classes: action.payload.data
			};

		case types.GET_FILTER_BAR_DOC_TYPE_SUCCESS:
			return {
				...state,
				docTypes: action.payload.data
			};

		case types.GET_SUBJECT_SUCCESS:
			return {
				...state,
				subjects: action.payload.data
			};

		case types.FILTER_BAR_CHANGE_CLASS:
			return {
				...state,
				selectedClasses: action.data
			};

		case types.FILTER_BAR_CHANGE_DOCTYPE:
			return {
				...state,
				selectedDocTypes: action.data
			};

		case types.FILTER_BAR_CHANGE_SUBJECT:
			return {
				...state,
				selectedSubject: action.data
			};

		case types.FILTER_BAR_CHANGE_FORMAT:
			return {
				...state,
				selectedFormat: action.data
			};

		case types.FILTER_BAR_CHANGE_PRICE:
			return {
				...state,
				selectedPrice: action.data
			};

		case types.FILTER_BAR_CHANGE_CHAPTER:
			return {
				...state,
				selectedChapter: action.data
			};

		case types.FILTER_BAR_CHANGE_KEYWORD:
			return {
				...state,
				keywords: action.data
			};

		case types.GET_FILTER_BAR_CHAPTER_SUCCESS:
			return {
				...state,
				chapters: action.payload.data
			};

		case types.GET_FILTER_BAR_SUBJECT_SUCCESS:
			return {
				...state,
				subjects: action.payload.data
			};

		case types.RESULT_FILTER_SUCCESS:
			return {
				...state,
				documents: action.payload.data
			};

		case types.HANDLE_CHANGE_VIEW:
			return {
				...state,
				viewStyle: action.data
			};

		default:
			return state;
	}
};

export default FilterBarReducer;