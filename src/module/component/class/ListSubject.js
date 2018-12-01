import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import {Link} from 'react-router-dom';
import _ from "lodash";
import TopWeekDoc from "../doc/TopWeekDoc";

class ListSubject extends Component {

	constructor(props) {
		super(props);
		this.state = {
			subjects: [{
				name: '',
				get_document: []
			}],
			catSlug: this.props.match.params.class,
			catName: ''
		}
	}

	componentDidMount = () => {
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
				catName: nextProps.SubjectReducer.subjectInClass.name
			})
		}

		return true;
	};

	render() {

		let {subjects, catSlug, catName} = this.state;

		return (
			<section className="document-wrapper">
				<div className="container">

					<Breadcrumb
						classSlug={catSlug}
						classLevel={catName}
					/>

					<div className="row">
						<div className="col-xs-12 col-md-9 document-detail">
							<div className="subject-list">
								<div className="row">
									{_.map(subjects, (sub, idx) => {
										return (
											<Link className="subject-item col-xs-6 col-md-3" key={idx} to={'/cat/' + catSlug + '/' + sub.slug}>
												<div className="subject-item-inner text-center">
													<div className="subject-item-avatar">
														<img src={sub.thumbnail} alt="" className="img-responsive center-block"/>
													</div>
													<div className="subject-item-name">
														{sub.name}
													</div>
													<div className="subject-item-count-document">
														{sub.get_document.length} Tài liệu
													</div>
												</div>
											</Link>
										)
									})}
								</div>
							</div>
						</div>

						<div className="col-xs-12 col-md-3 doc-list-filter-box">
							<TopWeekDoc/>
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

const mapDispatchToProps = (dispatch) => {
	return {
		getSubjectViaClass: (classSlug) => {
			dispatch(action.getSubjectViaClass(classSlug))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ListSubject);