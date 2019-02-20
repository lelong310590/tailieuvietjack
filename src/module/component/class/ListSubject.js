import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import {Link} from 'react-router-dom';
import _ from "lodash";
import TreeCategory from "../sidebar/TreeCategory";
import TagCloud from "../home/TagCloud";
import SubjectList from "../home/SubjectList";
import Filter from "../home/Filter";
import List from "../listDoc/List";
import HomeListDocument from "../home/HomeListDocument";
import Ads from "../home/Ads";
import ListDocuments from "../listDoc/ListDocuments";
import TagsFooter from "../tags/TagsFooter";

import * as api from "../../const/Api";
import axios from "axios";
import Meta from "../support/Meta";
import FilterBar from "../sidebar/FilterBar";

class ListSubject extends Component {

	constructor(props) {
		super(props);
		this.state = {
			subjects: [{
				name: '',
				get_document: []
			}],
			catSlug: this.props.match.params.class,
			catName: '',
			catId: 0,
			tagFooter: [],
			items: {
				data: []
			},
		}
	}

	componentDidMount = () => {
		//console.log(this.props.FilterReducer.selectedGrade);
		let {catSlug} = this.state;
		this.props.getSubjectViaClass(catSlug);
		this.props.getTagFooter(catSlug);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.location !== nextProps.location) {
			this.setState({
				catSlug: nextProps.match.params.class
			});

			this.props.getSubjectViaClass(nextProps.match.params.class);
		}

		if (this.props.SubjectReducer.subjectInClass !== nextProps.SubjectReducer.subjectInClass) {
			this.setState({
				subjects: nextProps.SubjectReducer.subjectInClass.subjects,
				catName: nextProps.SubjectReducer.subjectInClass.name,
				catId: nextProps.SubjectReducer.subjectInClass.id,
			});

			let {catId} = nextProps.SubjectReducer.subjectInClass.id;

		}

		if (this.props.TagCloudReducer.tagsFooter !== nextProps.TagCloudReducer.tagsFooter) {
			this.setState({
				tagFooter: nextProps.TagCloudReducer.tagsFooter
			})
		}

		if (this.state.catId !== nextState.catId) {
			this.fetchData(nextState.catId);
		}

		return true;
	};

	fetchData = (classesID) => {
		let apiUrl = api.API_LIST_DOC;

		this.setState({
			onLoading: true,
		});

		axios.get(apiUrl, {
			params: {
				classesId: classesID
			}
		})
			.then(response => {
				this.setState({
					items: response.data
				})
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				this.setState({
					onLoading: false
				})
			})
	};

	render() {

		let {subjects, catSlug, catName, catId, tagFooter, items} = this.state;

		return (
				<div className="document-wrapper home-wrapper">

					<Meta
						title={catName}
						description={catName}
						keywords={catName}
					/>

					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-3">
								<FilterBar
									history={this.props.history}
								/>
							</div>

							<div className="col-xs-12 col-md-9">
								<Breadcrumb
									catSlug={catSlug}
									classLevel={catName}
								/>

								<ListDocuments items={items.data}/>
							</div>
						</div>
					</div>

					<TagsFooter
						classLevel={catName}
						tags={tagFooter}
					/>
				</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSubjectViaClass: (catSlug) => {
			dispatch(action.getSubjectViaClass(catSlug))
		},

		changeGrade: (grade) => {
			dispatch(action.changeGrade(grade))
		},

		changeClass: (classId) => {
			dispatch(action.changeClass(classId))
		},

		changeSubject: (subject) => {
			dispatch(action.changeSubject(subject))
		},

		getTagFooter: (className) => {
			dispatch(action.getTagFooter(className))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ListSubject);
