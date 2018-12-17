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

export const getSubjectViaClass = (classSlug) => {
	return (dispatch) => {
		dispatch(getSubjectViaClassRequest());
		axios.get(api.API_GET_SUBJECT_VIA_CLASSES, {
			params: {
				classSlug
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

//get list subject via class id
export const getListSubjectViaClassRequest = () => ({
	type: types.GET_LIST_SUBJECT_VIA_CLASSES_REQUEST
});

export const getListSubjectViaClassSuccess = (data) => ({
	type: types.GET_LIST_SUBJECT_VIA_CLASSES_SUCCESS,
	payload: data
});

export const getListSubjectViaClassError = (err) => ({
	type: types.GET_LIST_SUBJECT_VIA_CLASSES_ERROR,
	payload: err
});

export const getListSubjectViaClass = (classId) => {
	return (dispatch) => {
		dispatch(getListSubjectViaClassRequest());
		axios.get(api.API_GET_LIST_SUBJECT_VIA_CLASSES, {
			params: {
				classId
			}
		})
			.then(response => {
				dispatch(getListSubjectViaClassSuccess(response));
			})
			.catch(err => {
				dispatch(getListSubjectViaClassError(err));
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
			params: {userId, filter, token, page, keyword}
		})
			.then(response => {
				dispatch(getUserDocumentSuccess(response))
			})
			.catch(error => {
				dispatch(getUserDocumentError(error))
			})
	};
};

//delete documents
export const postDeleteDocument = (id) => ({
	type: types.POST_USER_DOCUMENT_DELETE,
	payload: id
});

//get document info
export const getDocumentInfoRequest = () => ({
	type: types.GET_DOCUMENT_INFO_REQUEST
});

export const getDocumentInfoSuccess = (data) => ({
	type: types.GET_DOCUMENT_INFO_SUCCESS,
	payload: data
});

export const getDocumentInfoError = (err) => ({
	type: types.GET_DOCUMENT_INFO_ERROR,
	payload: err
});

export const getDocumentInfo = (docid, token) => {
	return (dispatch) => {
		dispatch(getDocumentInfoRequest());
		axios.get(api.API_GET_DOC_INFO, {
			headers: {
				Accept: 'application/json',
				Authorization: token
			},
			params: {docid}
		})
			.then(response => {
				dispatch(getDocumentInfoSuccess(response));
			})
			.catch(err => {
				dispatch(getDocumentInfoError(err));
			})
	}
};

//get chapter in cat
export const getChapterRequest = () => ({
	type: types.GET_CHAPTER_REQUEST
});

export const getChapterSuccess = (data) => ({
	type: types.GET_CHAPTER_SUCCESS,
	payload: data
});

export const getChapterError = (err) => ({
	type: types.GET_CHAPTER_ERROR,
	payload: err
});

export const getChapter = (categorySlug, subjectSlug) => {
	return (dispatch) => {
		dispatch(getChapterRequest());
		axios.get(api.API_GET_CHAPTER, {
			params: {categorySlug, subjectSlug}
		})
			.then(response => dispatch(getChapterSuccess(response)))
			.catch(err => dispatch(getChapterError(err)))
	}
};

// get list chapter
export const getListChapterRequest = () => ({
	type: types.GET_LIST_CHAPTER_REQUEST
});

export const getListChapterSuccess = (data) => ({
	type: types.GET_LIST_CHAPTER_SUCCESS,
	payload: data
});

export const getListChapterError = (err) => ({
	type: types.GET_LIST_CHAPTER_ERROR,
	payload: err
});

export const getListChapter = (categoryId, subjectId) => {
	return (dispatch) => {
		dispatch(getListChapterRequest());
		axios.get(api.API_GET_LIST_CHAPTER, {
			params: {categoryId, subjectId}
		})
			.then(response => dispatch(getListChapterSuccess(response)))
			.catch(err => dispatch(getListChapterError(err)))
	}
};

//get thematic in cat
export const getThematicRequest = () => ({
	type: types.GET_THEMATIC_REQUEST
});

export const getThematicSuccess = (data) => ({
	type: types.GET_THEMATIC_SUCCESS,
	payload: data
});

export const getThematicError = (err) => ({
	type: types.GET_THEMATIC_ERROR,
	payload: err
});

export const getThematic = (chapterId) => {
	return (dispatch) => {
		dispatch(getThematicRequest());
		axios.get(api.API_GET_THEMATIC, {
			params: {chapterId}
		})
			.then(response => dispatch(getThematicSuccess(response)))
			.catch(err => dispatch(getThematicError(err)))
	}
};

// get doc in thematic
export const getDocinThematicRequest = () => ({
	type: types.GET_DOC_IN_THEMATIC_REQUEST
});

export const getDocInThematicSuccess = (payload) => ({
	type: types.GET_DOC_IN_THEMATIC_SUCCESS,
	payload
});

export const getDocInThematicError = (payload) => ({
	type: types.GET_DOC_IN_THEMATIC_ERROR,
	payload
});

export const getDocInThematic = (chapterSlug) => {
	return (dispatch) => {
		dispatch(getDocinThematicRequest());
		axios.get(api.API_GET_DOC_IN_THEMATIC, {
			params: {chapterSlug}
		})
			.then(response => {
				dispatch(getDocInThematicSuccess(response))
			})
			.catch(err => {
				dispatch(getDocInThematicError(err))
			})
	}
};

//get tree
export const getTreeRequets = () => ({
	type: types.GET_TREE_REQUEST
});

export const getTreeSuccess = (payload) => ({
	type: types.GET_TREE_SUCCESS,
	payload
});

export const getTreeError = (payload) => ({
	type: types.GET_TREE_ERROR,
	payload
});

export const getTree = (currentCatID , currentSubjectId) => {
	return (dispatch) => {
		dispatch(getTreeRequets());
		axios.get(api.API_GET_TREE, {
			params: {
				cat: currentCatID,
				subject: currentSubjectId
			}
		})
			.then(response => {
				dispatch(getTreeSuccess(response))
			})
			.catch(err => {
				dispatch(getTreeError(err))
			})
	}
};

//get tag cloud
export const getTagCloudRequest = () => ({
	type: types.GET_TAG_CLOUD_REQUEST
});

export const getTagCloudSuccess = (payload) => ({
	type: types.GET_TAG_CLOUD_SUCCESS,
	payload
});

export const getTagCloudError = (err) => ({
	type: types.GET_TAG_CLOUD_ERROR,
	err
});

export const getTagCloud = () => {
	return (dispatch) => {
		dispatch(getTagCloudRequest());
		axios.get(api.API_GET_TAGCLOUD)
			.then(response => {
				dispatch(getTagCloudSuccess(response))
			})
			.catch(err => {
				dispatch(getTagCloudError(err))
			})
	}
};