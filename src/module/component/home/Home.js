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

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			highSchool: [],
			middleSchool: [],
			elementarySchool: []
		}
	}

	componentDidMount = () => {
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

		let {highSchool, middleSchool, elementarySchool} = this.state;

		return (
			<Fragment>

				<Meta/>

				<div className="document-wrapper home-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-3">

								<FilterBar
									history={this.props.history}
									location={this.props.location}
								/>

								<div style={{marginTop: '20px'}}>
									<TagCloud
										history={this.props.history}
									/>
								</div>
							</div>

							<div className="col-xs-12 col-md-9">
								{/*<SpecialDocument/>*/}

								<HomeListDocument
									title={'Tài liệu THPT'}
									documents={highSchool}
									slug={'?lop=trung-hoc-pho-thong'}
								/>

								<HomeListDocument
									title={'Tài liệu THCS'}
									documents={middleSchool}
									slug={'?lop=trung-hoc-co-so'}
								/>

								<HomeListDocument
									title={'Tài liệu tiểu học'}
									documents={elementarySchool}
									slug={'?lop=tai-lieu-tieu-hoc'}
								/>
							</div>
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
