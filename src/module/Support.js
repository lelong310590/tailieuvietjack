import axios from "axios";
import * as api from "./const/Api";

export const validateEmail = (email) => {
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
	let length = password.length;
	return length >= 6;
};

export const validateSamePassword = (pass, repass) => {
	return pass === repass;
};

export const trimFileName = (filename) => {
	if (filename) {
		return filename.split('.').slice(0, -1).join('.')
	}

	return filename;
};

export const convertPrice = (price) => {
	if (price === 0) {
		return 'Miễn phí'
	}

	return price;
};

export const renderNavLink = (url, onsort, page, keyword = '') => {
	const path = {
		pathname: url,
		search: 'onsort=' + onsort + '&page=' + page
	};

	if (keyword !== '') {
		path.search = 'onsort=' + onsort + '&keyword=' + keyword + '&page=' + page
	}

	return path;
};