import React, {Component, Fragment} from 'react';
import List from "../listDoc/List";
import Meta from "../support/Meta";
import Filter from "./Filter";
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import HomeListDocument from "./HomeListDocument";
import Ads from "./Ads";
import TagCloud from "./TagCloud";
import FilterBar from "../sidebar/FilterBar";
import SpecialDocument from "../listDoc/SpecialDocument";
import queryString from 'query-string';
import _ from 'lodash';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			highSchool: [],
			middleSchool: [],
			elementarySchool: [],
			params: 0,
		}
	}

	componentDidMount = () => {
		const search = this.props.location.search;
		let value = queryString.parse(search);
		if(!_.isEmpty(value)){
			this.setState({
				params: 1
			})
		}

		this.props.changeGrade(0);
		this.props.changeClass(0);
		this.props.getListSubjectViaClass();
		this.props.getHomeList();
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.HomeReducer.highSchool !== nextProps.HomeReducer.highSchool) {
			this.setState({
				highSchool: nextProps.HomeReducer.highSchool
			})
		}

		if (this.props.HomeReducer.middleSchool !== nextProps.HomeReducer.middleSchool) {
			this.setState({
				middleSchool: nextProps.HomeReducer.middleSchool
			})
		}

		if (this.props.HomeReducer.elementarySchool !== nextProps.HomeReducer.elementarySchool) {
			this.setState({
				elementarySchool: nextProps.HomeReducer.elementarySchool
			})
		}

		return true;
	};

	render() {

		let {highSchool, middleSchool, elementarySchool,params} = this.state;

		return (
			<Fragment>
				<Meta/>
				<div className="container wrap__page">
					<div className="wrap__left">
						<FilterBar
							history={this.props.history}
							location={this.props.location}
							match={this.props.match}
						/>
						<TagCloud
							history={this.props.history}
						/>
					</div>

					<div className="wrap__right">
						<div className="banner"><img src="/lib/images/banner.jpg" alt=""/></div>
						{/*<SpecialDocument/>*/}
						{params==0 &&
							<Fragment>
								<HomeListDocument
									title={'Tài liệu THPT'}
									documents={highSchool}
									slug={'/trung-hoc-pho-thong/d0s0c-3t0'}
								/>

								<HomeListDocument
									title={'Tài liệu THCS'}
									documents={middleSchool}
									slug={'/trung-hoc-co-so/d0s0c-2t0'}
								/>

								<HomeListDocument
									title={'Tài liệu tiểu học'}
									documents={elementarySchool}
									slug={'/tieu-hoc/d0s0c-1t0'}
								/>
							</Fragment>
						}
						{params==1 &&
						<Fragment>

						</Fragment>
						}
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
