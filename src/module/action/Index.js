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

//get list class in grade
export const getClassInGradeRequest = () => ({
	type: types.GET_CLASS_IN_GRADE_REQUEST
});

export const getClassInGradeSuccess = (payload) => ({
	type: types.GET_CLASS_IN_GRADE_SUCCESS,
	payload
});

export const getClassInGradeError = (err) => ({
	type: types.GET_CLASS_IN_GRADE_ERROR,
	err
});

export const getClassInGrade = (grade) => {
	return (dispatch) => {
		dispatch(getClassInGradeRequest());
		axios.get(api.API_GET_CLASS_IN_GRADE, {
			params: {
				grade
			}
		})
			.then(response => {
				dispatch(getClassInGradeSuccess(response))
			})
			.catch(err => {
				dispatch(getClassInGradeError(err))
			})
	}
};

//filter reducer handle
export const changeGrade = (grade) => ({
	type: types.CHANGE_GRADE,
	grade
});

export const changeClass = (classId) => ({
	type: types.CHANGE_CLASS,
	classId
});

export const changeSubject = (subject) => ({
	type: types.CHANGE_SUBJECT,
	subject
});

export const changeChapter = (chapter) => ({
	type: types.CHANGE_CHAPTER,
	chapter
});

export const getHomeListRequest = () => ({
	type: types.GET_HOME_LIST_REQUEST
});

export const getHomeListSuccess = (payload) => ({
	type: types.GET_HOME_LIST_SUCCESS,
	payload
});

export const getHomeListError = (err) => ({
	type: types.GET_HOME_LIST_ERROR,
	err
});

export const getHomeList = () => {
	return (dispatch) => {
		dispatch(getHomeListRequest());
		axios.get(api.API_GET_HOME_LIST)
			.then(resp => {
				dispatch(getHomeListSuccess(resp))
			})
			.catch(err => {
				dispatch(getHomeListError(err))
			})
	}
};

//reset list subjects
export const resetListSubject = () => ({
	type: types.RESET_LIST_SUBJECT,
	payload: []
});

//get post
export const getPostRequest = () => ({
	type: types.GET_POST_REQUEST
});

export const getPostSuccess = (payload) => ({
	type: types.GET_POST_SUCCESS,
	payload
});

export const getPostError = (err) => ({
	type: types.GET_POST_ERROR,
	err
});

export const getPost = (slug) => {
	return (dispatch) => {
		dispatch(getPostRequest());
		axios.get(api.API_GET_POST, {
			params: {
				slug
			}
		})
			.then(response => {
				dispatch(getPostSuccess(response))
			})
			.catch(err => {
				dispatch(getPostError(err))
			})
	}
}

//get tag footer
export const getTagFooterRequest = () => ({
	type: types.GET_TAG_FOOTER_REQUEST
});

export const getTagFooterSuccess = (payload) => ({
	type: types.GET_TAG_FOOTER_SUCCESS,
	payload
});

export const getTagFooterError = (err) => ({
	type: types.GET_TAG_FOOTER_ERROR,
	err
});

export const getTagFooter = (className, subjectName = null) => {
	return (dispatch) => {
		dispatch(getTagCloudRequest());
		axios.get(api.API_GET_TAG_FOOTER, {
			params: {
				className,
				subjectName
			}
		})
			.then(response => {
				dispatch(getTagFooterSuccess(response))
			})
			.catch(err => {
				dispatch(getTagFooterError(err))
			})
	}
};

//update user
export const postUpdateUserRequest = () => ({
	type: types.POST_UPDATE_USER_REQUEST,
	loading: true
});

export const postUpdateUserSuccess = (payload) => ({
	type: types.POST_UPDATE_USER_SUCCESS,
	payload
});

export const postUpdateUserError = (err) => ({
	type: types.POST_UPDATE_USER_ERROR,
	err
});

export const postUpdateUser = (obj, token) => {
	return (dispatch) => {

		let formData = new FormData();

		formData.append('firstName', obj.firstName);
		formData.append('lastName', obj.lastName);
		formData.append('userId', obj.userId);
		formData.append('sex', obj.sex);

		let config = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: token
			},
		};
		dispatch(postUpdateUserRequest());
		axios.post(api.API_UPDATE_USER, formData, config)
			.then(response => {
				dispatch(postUpdateUserSuccess(response))
			})
			.catch(err => {
				dispatch(postUpdateUserError(err))
			})
	}
};

//get document by tags
export const getDocumentByTagRequest = () => ({
	type: types.GET_DOCUMENT_BY_TAG_REQUEST
});

export const getDocumentByTagSuccess = (payload) => ({
	type: types.GET_DOCUMENT_BY_TAG_SUCCESS,
	payload
});

export const getDocumentByTagError = (err) => ({
	type: types.GET_DOCUMENT_BY_TAG_ERROR,
	err
});

export const getDocumentByTag = (tagSlug, page) => {
	return (dispatch) => {
		dispatch(getDocumentByTagRequest());
		axios.get(api.API_GET_DOCUMENT_BY_TAG, {
			params: {
				tagSlug,
				page
			}
		})
			.then(response => {
				dispatch(getDocumentByTagSuccess(response))
			})
			.catch(err => {
				dispatch(getDocumentByTagError(err))
			})
	}
};

//get author
export const getAuthorRequest = () => ({
	type: types.GET_AUTHOR_REQUEST
});

export const getAuthorSuccess = (payload) => ({
	type: types.GET_AUTHOR_SUCCESS,
	payload
});

export const getAuthorError = (payload) => ({
	type: types.GET_AUTHOR_ERROR,
	payload
});

export const getAuthor = (id, onsort, page) => {
	return (dispatch) => {
		dispatch(getAuthorRequest());
		axios.get(api.API_GET_AUTHOR, {
			params: {
				userId: id,
				onsort, page
			}
		})
			.then(response => {
				dispatch(getAuthorSuccess(response))
			})
			.catch(err => {
				dispatch(getAuthorError(err))
			})
	}
};

//most view
export const getMostViewRequest = () => ({
	type: types.GET_MOST_VIEW_REQUEST
});

export const getMostViewSuccess = (payload) => ({
	type: types.GET_MOST_VIEW_SUCCESS,
	payload
});

export const getMostViewError = (err) => ({
	type: types.GET_MOST_VIEW_ERROR,
	payload: err
});

export const getMostView = (classes) => {
	return (dispatch) => {
		dispatch(getMostViewRequest());
		axios.get(api.API_GET_MOST_VIEW_BY_WEEK+'?class='+classes)
			.then(response => {
				dispatch(getMostViewSuccess(response))
			})
			.catch(err => {
				dispatch(getMostViewError(err))
			})
	}
};

/*
	Filter bar
 */
export const getFilterBarClassRequest = () => ({
	type: types.GET_FILTER_BAR_CLASS_REQUEST
});

export const getFilterBarClassSuccess = (payload) => ({
	type: types.GET_FILTER_BAR_CLASS_SUCCESS,
	payload
});

export const getFilterBarClassError = (err) => ({
	type: types.GET_FILTER_BAR_CLASS_ERROR,
	payload: err
});

export const getFilterBarClass = () => {
	return (dispatch) => {
		dispatch(getFilterBarClassRequest());
		axios.get(api.API_FILTER_BAR_CLASS)
			.then(response => {
				dispatch(getFilterBarClassSuccess(response))
			})
			.catch(err => {
				dispatch(getFilterBarClassError(err))
			})
	}
};

export const getDocTypeRequest = () => ({
	type: types.GET_FILTER_BAR_DOC_TYPE_REQUEST
});

export const getDocTypeSuccess = (payload) => ({
	type: types.GET_FILTER_BAR_DOC_TYPE_SUCCESS,
	payload
});

export const getDocTypeError = (err) => ({
	type: types.GET_FILTER_BAR_DOC_TYPE_ERROR,
	payload: err
});

export const getDocType = () => {
	return (dispatch) => {
		dispatch(getDocTypeRequest());
		axios.get(api.API_FILTER_BAR_DOC_TYPE)
			.then(response => {
				dispatch(getDocTypeSuccess(response));
			})
			.catch(err => {
				dispatch(getDocTypeError(err));
			})
	}
};

export const getFilterBarChapterRequest = () => ({
	type: types.GET_FILTER_BAR_CHAPTER_REQUEST
});

export const getFilterBarChapterSuccess = (payload) => ({
	type: types.GET_FILTER_BAR_CHAPTER_SUCCESS,
	payload
});

export const getFilterBarChapterError = (err) => ({
	type: types.GET_FILTER_BAR_CHAPTER_ERROR,
	err
});

export const getFilterBarChapter = (classId, subjectId) => {
	return (dispatch) => {
		dispatch(getFilterBarChapterRequest());
		axios.get(api.API_FILTER_BAR_CHAPTER, {
			params: {
				classId, subjectId
			}
		})
			.then(response => {
				dispatch(getFilterBarChapterSuccess(response))
			})
			.catch(err => {
				dispatch(getFilterBarChapterError(err))
			})
	}
}

export const handleChangeClasses = (data) => {
	return {
		type: types.FILTER_BAR_CHANGE_CLASS,
		data: parseInt(data)
	}
};

export const handleChangeDocType = (data) => {
	return {
		type: types.FILTER_BAR_CHANGE_DOCTYPE,
		data: parseInt(data)
	}
};

export const handleChangeSubject = (data) => {
	return {
		type: types.FILTER_BAR_CHANGE_SUBJECT,
		data: parseInt(data)
	}
};

export const handleChangeFormat = (data) => {
	return {
		type: types.FILTER_BAR_CHANGE_FORMAT,
		data: parseInt(data)
	}
};

export const handleChangePrice = (data) => {
	return {
		type: types.FILTER_BAR_CHANGE_PRICE,
		data: parseInt(data)
	}
};

export const handleChangeKeyword = (data) => {
	return {
		type: types.FILTER_BAR_CHANGE_KEYWORD,
		data
	}
};

export const handleChangeChapter = (data) => {
	return {
		type: types.FILTER_BAR_CHANGE_CHAPTER,
		data
	}
};

//handle change view
export const handleChangeView = (data) => ({
	type: types.HANDLE_CHANGE_VIEW,
	data
})

// result data
export const getResultRequest = () => ({
	type: types.RESULT_FILTER_REQUEST
});

export const getResultSuccess = (payload) => ({
	type: types.RESULT_FILTER_SUCCESS,
	payload
});

export const getResultError = (err) => ({
	type: types.RESULT_FILTER_ERROR,
	payload: err
});

export const getResult = (keyword, docTypeId, classesId, subjectId, chapterId, formatId, price, page,order) => {
	return (dispatch) => {
		dispatch(getResultRequest());
		axios.get(api.API_LIST_DOC, {
			params: {
				keyword, docTypeId, classesId, subjectId, chapterId, formatId, price, page,order
			}
		})
			.then(response => {
				dispatch(getResultSuccess(response))
			})
			.catch(err => {
				dispatch(getResultError(err))
			})
	}
};

export const deactivedoc = () => ({
	type: types.DEACTIVE_DOC,
});