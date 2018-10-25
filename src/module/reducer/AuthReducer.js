import * as types from './../const/ActionType';

let initialState = {
	loggedIn: true,
	email: '',
	password: '',
};

let AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOGIN_EMAIL_HANDLE:
			let email = action.email;
			state.email = email;
			return state;
		case types.LOGIN_PASSWORD_HANDLE:
			let password = action.password;
			state.password = password;
			return state;
		default:
			return state;
	}
};

export default AuthReducer;