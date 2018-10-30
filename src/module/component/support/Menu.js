import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from "../../action/Index";
import _ from 'lodash';

class Menu extends Component {

	componentWillMount = () => {
		this.props.getMainMenu();
	};

	render() {
		let {menus} = this.props.MenuReducer;

		let menuElem = _.map(menus, (value, index) => {
			let hasChild = !_.isEmpty(value.subjects);
			return (
				<li className={hasChild ? 'has-child' : ''} key={index}>
					<Link to={'/cat/' + value.slug}>
						<i className="fas fa-graduation-cap"></i> {value.name}
					</Link>
					{hasChild &&
						<div className="subject-level-menu">
							<ul>
								{_.map(value.subjects, (v, i) => {
									return (
										<li key={i}><Link to={'/cat/' + value.slug + '/' + v.slug}>{v.name}</Link></li>
									)
								})}
							</ul>
						</div>
					}
				</li>
			)
		});

		return (
			<div className="menu-list">
				<div className="class-level-menu">
					<ul>
						{menuElem}
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getMainMenu: () => {
			dispatch(actions.getMainMenu())
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (Menu);