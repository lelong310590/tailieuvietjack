import * as types from './../const/ActionType';

let initialState = {
	fullName: 'Le Ngoc Long',
	birth: new Date(2017, 0, 1)
};

let UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_CHANGE_NAME:
			let name = action.name;
			state.fullName = name;
			return state;
		case types.USER_CHANGE_BIRTH:
			let birth = action.birth;
			state.birth = birth;
			return state;
		default:
			return state;
	}
};

export default UserReducer;