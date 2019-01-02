import React, {Component, Fragment} from 'react';
import List from "../listDoc/List";
import Meta from "../support/Meta";
import Filter from "./Filter";
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import HomeListDocument from "./HomeListDocument";
import Ads from "./Ads";

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			math: [],
			phy: [],
			bio: [],
			eng: []
		}
	}

	componentDidMount = () => {
		this.props.changeGrade(0);
		this.props.changeClass(0);
		this.props.getListSubjectViaClass();
		this.props.getHomeList();
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.HomeReducer.math !== nextProps.HomeReducer.math) {
			this.setState({
				math: nextProps.HomeReducer.math
			})
		}

		if (this.props.HomeReducer.phy !== nextProps.HomeReducer.phy) {
			this.setState({
				phy: nextProps.HomeReducer.phy
			})
		}

		if (this.props.HomeReducer.bio !== nextProps.HomeReducer.bio) {
			this.setState({
				bio: nextProps.HomeReducer.bio
			})
		}

		if (this.props.HomeReducer.eng !== nextProps.HomeReducer.eng) {
			this.setState({
				eng: nextProps.HomeReducer.eng
			})
		}

		return true;
	};

	render() {

		let {math, phy, bio, eng} = this.state;

		return (
			<Fragment>

				<Meta/>

				<div className="document-wrapper home-wrapper">
					<div className="container">
						<div className="col-xs-12 col-md-9">

							<Filter
								history={this.props.history}
							/>

							<div className="row">
								<List
									title={'Tài liệu nổi bật'}
									itemClass={'col-xs-6 col-md-3 col-lg-3'}
								/>

								<HomeListDocument
									title={'Tài liệu môn toán'}
									documents={math}
								/>
							</div>
						</div>

						<div className="col-xs-12 col-md-3 sticky-sidebar">
							<Ads/>
						</div>
					</div>
				</div>

			</Fragment>

		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeGrade: (grade) => {
			dispatch(action.changeGrade(grade));
		},

		changeClass: (classId) => {
			dispatch(action.changeClass(classId));
		},

		getHomeList: () => {
			dispatch(action.getHomeList());
		},

		getListSubjectViaClass: () => {
			dispatch(action.getListSubjectViaClass(0))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (Home);