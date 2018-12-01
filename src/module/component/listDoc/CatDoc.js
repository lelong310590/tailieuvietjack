import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import List from "./List";
import FilterBox from "./FilterBox";
import {connect} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import * as api from './../../const/Api';
import Loading from "../support/Loading";

class CatDoc extends Component {

	constructor(props) {
		super(props);
		this.state = {
			classLevelSlug: '',
			subjectSlug: '',
			classLevelName: '',
			classLevelId: 0,
			subjectName: '',
			subjectId: 0,

			onLoading: true,
		}
	}

	componentDidMount = () => {
		let classLevel = this.props.match.params.class;
		let {subject} = this.props.match.params;
		let {catId, catName, subId, subName} = this.props.location.state;
		this.setState({
			classLevelSlug: classLevel,
			subjectSlug: subject,
			subjectId: subId,
			subjectName: subName,
			classLevelId: catId,
			classLevelName: catName
		});

		this.gethData([catId], [subId]);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.location.state !== nextProps.location.state) {
			this.setState({
				subjectId: nextProps.location.state.subId,
				subjectName: nextProps.location.state.subName,
				classLevelId: nextProps.location.state.catId,
				classLevelName: nextProps.location.state.catName
			});

			this.gethData([nextProps.location.state.catId], [nextProps.location.state.subId]);
		}

		return true;
	};

	gethData = (classId, subjectId) => {
		this.setState({onLoading: true});

		let params = {
			category: classId
		};

		let checkSubject = _.findIndex(subjectId, (s) => {
			return s === undefined
		});

		if (checkSubject < 0) {
			params.subject = subjectId
		};

		axios.get(api.API_GET_DOCUMENT_IN_CAT, {
			params: params
		})
			.then(response => {
				console.log(response)
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				this.setState({onLoading: false})
			})
	};

	render() {

		let {classLevelSlug, subjectSlug, classLevelName, subjectName, classLevelId, subjectId, onLoading} = this.state;

		return (
			<section className="document-wrapper">
				<div className="container">

					<Breadcrumb
						classSlug={classLevelSlug}
						subjectSlug={subjectSlug}
						classLevel={classLevelName}
						subject={subjectName}
					/>

					<div className="row">
						<div className="col-xs-12 col-md-9 document-detail">
							{onLoading ? (
								<Loading/>
							) : (
								<List
									itemClass={'col-xs-6 col-md-3 col-lg-3'}
									filterBar={true}
									classLevel={classLevelId}
								/>
							)}
						</div>

						<div className="col-xs-12 col-md-3 doc-list-filter-box">
							<FilterBox
								title={'Danh sách lớp'}
								type={'classes'}
							/>

							<FilterBox
								title={'Danh sách môn học'}
								type={'subjects'}
							/>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps) (CatDoc);