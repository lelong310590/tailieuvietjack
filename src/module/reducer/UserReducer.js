import * as types from './../const/ActionType';

let initialState = {
	id: 0,
	firstName: '',
	lastName: '',
	email: '',
	thumbnail: '',
	birth: new Date(2017, 0, 1),
	docCount: 0,
	docDownload: 0,
	address: '',
	gender: 0,
	profit: 0,
	totalMoney: 0
};

let UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_USER_INFO_SUCCESS:
			let user = action.payload.data;
			//console.log(user);
			return {
				...state,
				id: user.id,
				firstName: user.first_name,
				lastName: user.last_name,
				email: user.email,
				thumbnail: user.thumbnail
			};
		case types.GET_USER_INFO_FAIL:
			console.log(action);
			return {
				...state
			};
		default:
			return state;
	}
};

export default UserReducer;