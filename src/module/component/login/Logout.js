import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';

class Logout extends Component {

	componentWillMount = () => {
		this.props.handleLogout();
		localStorage.clear();
		this.props.history.push('/');
	};

	render() {
		return (
			<div></div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleLogout: () => {
			dispatch(actions.handleLogout())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (Logout);