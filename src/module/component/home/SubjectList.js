import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class SubjectList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			subjects: []
		}
	}

	componentDidMount = () => {
		this.props.getSubjects();
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.SubjectReducer.subjects !== nextProps.SubjectReducer.subjects) {
			this.setState({
				subjects: nextProps.SubjectReducer.subjects
			})
		}

		return true;
	};

	render() {

		let {subjects} = this.state;

		return (
			<div className="subject-list-wrapper">
				{_.map(subjects, (s, idx) => {
					return (
						<Link className="subject-list-item" to={'/'} key={idx}>
							<img src={s.thumbnail} alt="" className="img-responsive subject-list-item-icon"/>
							<h4>{s.name}</h4>
						</Link>
					)
				})}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getSubjects: () => {
			dispatch(action.getSubjects())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (SubjectList);