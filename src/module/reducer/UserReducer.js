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
	totalMoney: 0,
	activeDoc: 0,
	unActiveDoc: 0,
	onLoading: false,
	updateSuccess: false
};

let UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_USER_INFO_SUCCESS:
			let user = action.payload.data;
			localStorage.setItem('userId', user.id);
			localStorage.setItem('userEmail', user.email);
			return {
				...state,
				id: user.id,
				firstName: user.first_name,
				lastName: user.last_name,
				email: user.email,
				thumbnail: user.thumbnail,
				profit: parseInt(user.get_wallet.balance_page),
				totalMoney: parseInt(user.get_wallet.balance_page + user.get_wallet.balance_pay),
				activeDoc: parseInt(user.active_doc),
				unActiveDoc: parseInt(user.unactive_doc)
			};

		case types.POST_UPDATE_USER_REQUEST:
			return {
				...state,
				onLoading: true
			};

		case types.POST_UPDATE_USER_SUCCESS:
			console.log('sex: ', action.payload.data.sex);
			let sex = 0;

			if (action.payload.data.sex === 'male') {
				sex = 1;
			} else if (action.payload.data.sex === 'female') {
				sex = 2;
			} else {
				sex = 0
			}

			return {
				...state,
				firstName: action.payload.data.first_name,
				lastName: action.payload.data.last_name,
				gender: sex,
				onLoading: false,
				updateSuccess: true
			};

		case types.GET_USER_INFO_FAIL:
			return {
				...state
			};

		default:
			return state;
	}
};

export default UserReducer;