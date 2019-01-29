import * as types from './../const/ActionType';

let initialState = {
	highSchool: [],
	middleSchool: [],
	elementarySchool: []
};

let HomeReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_HOME_LIST_SUCCESS:
			return {
				...state,
				highSchool: action.payload.data.highSchool,
				middleSchool: action.payload.data.middleSchool,
				elementarySchool: action.payload.data.elementarySchool,
			};
		default:
			return state;
	}
};

export default HomeReducer