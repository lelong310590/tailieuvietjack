import * as types from './../const/ActionType';
import axios from 'axios';
import * as api from './../const/Api';

export const handleLogedIn = () => ({
	type: types.HANDLE_LOGIN_USER
});

export const handleLogout = () => ({
	type: types.HANDLE_LOGOUT_USER
});

//get user info
export const getUserInfoRequest = () => ({
	type: types.GET_USER_INFO_REQUEST
});

export const getUserInfoSuccess = (data) => ({
	type: types.GET_USER_INFO_SUCCESS,
	payload: data
});

export const getUserInfoFail = (err) => ({
	type: types.GET_USER_INFO_FAIL,
	payload: err
});

export const getUserInfo = (token) => {
	return (dispatch) => {
		dispatch(getUserInfoRequest());
		return axios.get(api.API_GET_USER, {
			headers: {
				Accept: 'application/json',
				Authorization: token
			}
		})
			.then(response => dispatch(getUserInfoSuccess(response)))
			.catch(error => dispatch(getUserInfoFail(error)))
	}
};

// get menu
export const getMainMenuRequest = () => ({
	type: types.GET_MAIN_MENU_REQUEST
});

export const getMainMenuSuccess = (data) => ({
	type: types.GET_MAIN_MENU_SUCCESS,
	payload: data
});

export const getMainMenuError = (err) => ({
	type: types.GET_MAIN_MENU_ERROR,
	payload: err
});

export const getMainMenu = () => {
	return (dispatch) => {
		dispatch(getMainMenuRequest());
		return axios.get(api.API_GET_MENU)
			.then(response => {
				dispatch(getMainMenuSuccess(response))
			})
			.catch(err => {
				dispatch(getMainMenuError(err))
			})
	}
};