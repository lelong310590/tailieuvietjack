import * as types from './../const/ActionType';

let initialState = {
	listDoc: {
		title: '',
		limit: 8,
	},
};

let ListDocReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default ListDocReducer;