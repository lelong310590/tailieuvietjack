import * as types from './../const/ActionType';

let initialState = {
	math: [],
	phy: [],
	che: [],
	eng: [],
	lite: [],
	bio: []
};

let HomeReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_HOME_LIST_SUCCESS:
			return {
				...state,
				math: action.payload.data.math,
				phy: action.payload.data.phy,
				che: action.payload.data.che,
				eng: action.payload.data.eng,
				lite: action.payload.data.lite,
				bio: action.payload.data.bio,
			};
		default:
			return state;
	}
};

export default HomeReducer