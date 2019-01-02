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
			catId: 0
		}
	}

	componentDidMount = () => {
		//console.log(this.props.FilterReducer.selectedGrade);
		let {catSlug} = this.state;
		this.props.getSubjectViaClass(catSlug);
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
			})
		}

		return true;
	};

	render() {

		let {subjects, catSlug, catName, catId} = this.state;

		return (
				<div className="document-wrapper home-wrapper">

					<div className="container">

						<Breadcrumb
							classSlug={catSlug}
							classLevel={catName}
						/>

						<div className="col-xs-12 col-md-9">

							<Filter
								history={this.props.history}
								catId={catId}
							/>

							<div className="row">
								<ListDocuments/>
							</div>
						</div>

						<div className="col-xs-12 col-md-3 sticky-sidebar">
							<Ads/>
						</div>
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
		getSubjectViaClass: (classSlug) => {
			dispatch(action.getSubjectViaClass(classSlug))
		},

		changeGrade: (grade) => {
			dispatch(action.changeGrade(grade))
		},

		changeClass: (classId) => {
			dispatch(action.changeClass(classId))
		},

		changeSubject: (subject) => {
			dispatch(action.changeSubject(subject))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ListSubject);