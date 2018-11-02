import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from "../../action/Index";
import _ from 'lodash';

class FilterBox extends Component {

	componentDidMount = () => {
		this.props.getClasses();
		this.props.getSubject();
	};

	render() {
		let {subjects} = this.props.SubjectReducer;
		let {classes} = this.props.ClassesReducer;

		let classElem = _.map(classes, (value, index) => {
			return(
				<div className="checkbox" key={index}>
					<label>
						<input type="checkbox" value="" id=""/> {value.name}
					</label>
				</div>
			)
		});

		let subjectElem = _.map(subjects, (value, index) => {
			return(
				<div className="checkbox" key={index}>
					<label>
						<input type="checkbox" value="" id=""/> {value.name}
					</label>
				</div>
			)
		});

		return (
			<div className="widget filter-box-wrapper">
				<div className="widget-title">
					<h4 className="text-center">{this.props.title}</h4>
				</div>
				<div className="widget-content">
					<div className="featured-document-wrapper">
						<div className="filter-box-category-item">
							{this.props.type === 'classes' &&
								<Fragment>
									{classElem}
								</Fragment>

							}

							{this.props.type === 'subjects' &&
								<Fragment>
									{subjectElem}
								</Fragment>
							}
						</div>
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
		getClasses: () => {
			dispatch(actions.getClasses())
		},

		getSubject: () => {
			dispatch(actions.getSubjects())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (FilterBox);

FilterBox.defaultProps = {
	type: 'classes'
};