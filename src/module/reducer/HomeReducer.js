import * as types from './../const/ActionType';

let initialState = {
	math: [],
	phy: [],
	bio: [],
	eng: []
};

let HomeReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_HOME_LIST_SUCCESS:
			return {
				...state,
				math: action.payload.data.math,
				phy: action.payload.data.phy,
				bio: action.payload.data.bio,
				eng: action.payload.data.eng,
			};
		default:
			return state;
	}
};

export default HomeReducer