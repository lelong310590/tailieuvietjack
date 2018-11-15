import * as types from './../const/ActionType';
import _ from 'lodash';

let initialState = {
	docs: {
		data: []
	}
};

let UserDocument = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_USER_DOCUMENT_SUCCESS:
			return {
				...state,
				docs: action.payload.data
			};
		case types.POST_USER_DOCUMENT_DELETE:
			let docId = action.payload;
			let {docs} = state;
			let {data} = docs;
			_.remove(data, (d) => {
				return d.id === docId
			});

			docs.data = data;

			return {
				...state,
				docs: docs
			};
		default:
			return state;
	}
};

export default UserDocument;