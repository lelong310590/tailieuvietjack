import * as types from './../const/ActionType';

let initialState = {
	price: []
};

let PriceReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_PRICE_SUCCESS:
			return {
				...state,
				price: action.payload.data
			};
		default:
			return state;
	}
};

export default PriceReducer;