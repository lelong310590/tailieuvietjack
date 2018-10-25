import * as types from './../const/ActionType';

export const handleLoginEmail = (email) => {
	return {
		type: types.LOGIN_EMAIL_HANDLE,
		email
	}
};

export const handleLoginPassword = (password) => {
	return {
		type: types.LOGIN_PASSWORD_HANDLE,
		password
	}
};

export const handleUserName = (name) => {
	return {
		type: types.USER_CHANGE_NAME,
		name
	}
};

export const handleUserBirth = (birth) => {
	return {
		type: types.USER_CHANGE_BIRTH,
		birth
	}
};