import * as types from './../const/ActionType';

let initialState = {
	thematic: [],
	docInThematic: {
		"thematic": {
			"name": "Các hàm số lượng giác",
			"get_chapter": {
				"name": "HÀM SỐ LƯỢNG GIÁC VÀ PHƯƠNG TRÌNH LƯỢNG GIÁC",
				"slug": "ham-so-luong-giac-va-phuong-trinh-luong-giac",
				"get_category": {
					"name": "Lớp 8",
					"slug": "lop-8",
				},
				"get_subject": {
					"name": "Toán",
					"slug": "toan",
				}
			}
		},
		"document": {
			"data": [
				{
					"id": 224,
					"name": "hoa don thang 10",
					"price": 200000,
					"thumbnail": null,
					"formats": "pdf",
					"pages": 1,
					"views": 10,
					"downloaded": 0,
					"index": 0,
				}
			],
		}
	}
};

let ThematicReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_THEMATIC_SUCCESS:
			return {
				...state,
				thematic: action.payload.data
			};
		case types.GET_DOC_IN_THEMATIC_SUCCESS:
			return {
				...state,
				docInThematic: action.payload.data
			};
		default:
			return state;
	}
};

export default ThematicReducer;