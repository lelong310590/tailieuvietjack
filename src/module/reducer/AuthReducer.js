import * as types from './../const/ActionType';

let initialState = {
	loggedIn: false,
};

let AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.HANDLE_LOGIN_USER:
			return {
				...state,
				loggedIn: true
			};
		case types.HANDLE_LOGOUT_USER:
			return {
				...state,
				loggedIn: false
			};
		default:
			return state;
	}
};

export default AuthReducer;