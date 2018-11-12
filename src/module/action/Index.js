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
		axios.get(api.API_GET_USER, {
			headers: {
				Accept: 'application/json',
				Authorization: token
			}
		})
			.then(response => {
				dispatch(getUserInfoSuccess(response))
			})
			.catch(error => {
				dispatch(getUserInfoFail(error))
			})
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
		axios.get(api.API_GET_MENU)
			.then(response => {
				dispatch(getMainMenuSuccess(response))
			})
			.catch(err => {
				dispatch(getMainMenuError(err))
			})
	}
};

//get classes
export const getClassesRequest = () => ({
	type: types.GET_CLASSES_REQUEST
});

export const getClassesSuccess = (data) => ({
	type: types.GET_CLASSES_SUCCESS,
	payload: data
});

export const getClassesError = (err) => ({
	type: types.GET_CLASSES_ERROR,
	payload: err
});

export const getClasses = () => {
	return (dispatch) => {
		dispatch(getClassesRequest());
		axios.get(api.API_GET_CLASSES)
			.then(response => {
				dispatch(getClassesSuccess(response))
			})
			.catch(err => {
				dispatch(getClassesError(err))
			})
	}
};

//get all subjects
export const getSubjectRequest = () => ({
	type: types.GET_SUBJECT_REQUEST
});

export const getSubjectSuccess = (data) => ({
	type: types.GET_SUBJECT_SUCCESS,
	payload: data
});

export const getSubjectError = (err) => ({
	type: types.GET_SUBJECT_ERROR,
	payload: err
});

export const getSubjects = () => {
	return (dispatch) => {
		dispatch(getSubjectRequest());
		axios.get(api.API_GET_SUBJECTS)
			.then(response => {
				dispatch(getSubjectSuccess(response));
			})
			.catch(err => {
				dispatch(getSubjectError(err));
			})
	}
};

//get subject via class id
export const getSubjectViaClassRequest = () => ({
	type: types.GET_SUBJECT_VIA_CLASSES_REQUEST
});

export const getSubjectViaClassSuccess = (data) => ({
	type: types.GET_SUBJECT_VIA_CLASSES_SUCCESS,
	payload: data
});

export const getSubjectViaClassError = (err) => ({
	type: types.GET_SUBJECT_VIA_CLASSES_ERROR,
	payload: err
});

export const getSubjectViaClass = (classId) => {
	return (dispatch) => {
		dispatch(getSubjectViaClassRequest());
		axios.get(api.API_GET_SUBJECT_VIA_CLASSES, {
			params: {
				classId
			}
		})
			.then(response => {
				dispatch(getSubjectViaClassSuccess(response));
			})
			.catch(err => {
				dispatch(getSubjectViaClassError(err));
			});
	}
};

//get price list
export const getPriceRequest = () => ({
	type: types.GET_PRICE_REQUEST
});

export const getPriceSuccess = (data) => ({
	type: types.GET_PRICE_SUCCESS,
	payload: data
});

export const getPriceError = (err) => ({
	type: types.GET_PRICE_ERROR,
	payload: err
});

export const getPrice = () => {
	return (dispatch) => {
		dispatch(getPriceRequest());
		axios.get(api.API_GET_PRICE)
			.then(response => {
				dispatch(getPriceSuccess(response))
			})
			.catch(err => {
				dispatch(getPriceError(err))
			})
	}
};

//get user documents list
export const getUserDocumentRequest = () => ({
	type: types.GET_USER_DOCUMENT_REQUEST
});

export const getUserDocumentSuccess = (data) => ({
	type: types.GET_USER_DOCUMENT_SUCCESS,
	payload: data
});

export const getUserDocumentError = (err) => ({
	type: types.GET_USER_DOCUMENT_ERROR,
	payload: err
});

export const getUserDocument = (userId, filter, token, page, keyword) => {
	return (dispatch) => {
		dispatch(getUserDocumentRequest());

		axios.get(api.API_GET_USER_DOCUMENT, {
			headers: {
				Accept: 'application/json',
				Authorization: token
			},
			params: {
				userId,
				filter,
				page,
				keyword
			}
		})
			.then(response => {
				dispatch(getUserDocumentSuccess(response))
			})
			.catch(error => {
				dispatch(getUserDocumentError(error))
			})
	};
};