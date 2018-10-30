import * as types from './../const/ActionType';

let initialState = {
	menus: []
};

let MenuReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_MAIN_MENU_SUCCESS:
			return {
				...state,
				menus: action.payload.data
			};
		default:
			return state;
	}
};

export default MenuReducer;