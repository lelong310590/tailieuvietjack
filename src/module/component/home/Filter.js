import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import _ from 'lodash';
import {Link} from 'react-router-dom';

class Filter extends Component {

	constructor(props) {
		super(props);
		this.state = {
			classes: [],
			subjects: [],
			chapters: [],
			grade: 0,
			selectedClass: 0,
			subjectThumbnail: '',
			subjectName: '',
			tagsTrend: [],
		}
	}

	componentDidMount = () => {
		let {selectedGrade, selectedClass} = this.props.FilterReducer;
		this.setState({
			grade: selectedGrade,
			selectedClass,
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		// console.log('grade: ', this.state.grade);
		// console.log('nextGrade: ', nextState.grade);

		if (this.state.grade !== nextState.grade) {
			this.props.getClassInGrade(nextState.grade);
		}

		if (this.props.GradeReducer.classes !== nextProps.GradeReducer.classes) {
			this.setState({
				classes: nextProps.GradeReducer.classes
			})
		}

		if (this.props.SubjectReducer.listSubjectinClass !== nextProps.SubjectReducer.listSubjectinClass) {
			this.setState({
				subjects: nextProps.SubjectReducer.listSubjectinClass
			})
		}

		if (this.props.FilterReducer.selectedGrade !== nextProps.FilterReducer.selectedGrade ) {
			this.setState({
				grade: nextProps.FilterReducer.selectedGrade
			})
		}

		if (this.props.FilterReducer.selectedClass !== nextProps.FilterReducer.selectedClass) {
			this.setState({
				selectedClass: nextProps.FilterReducer.selectedClass
			})
		}

		if (this.props.chapters !== nextProps.chapters) {
			this.setState({
				chapters: nextProps.chapters
			})
		}

		if (this.props.subjectThumbnail !== nextProps.subjectThumbnail) {
			this.setState({
				subjectThumbnail: nextProps.subjectThumbnail
			})
		}

		if (this.props.subjectName !== nextProps.subjectName) {
			this.setState({
				subjectName: nextProps.subjectName
			})
		}

		if (this.props.tagsTrend !== nextProps.tagsTrend) {
			this.setState({
				tagsTrend: nextProps.tagsTrend
			})
		}

		return true;
	};

	handleChangeGrade = (event) => {
		let grade = event.target.value;
		//this.setState({grade});
		this.props.changeGrade(grade);
		this.props.getClassInGrade(grade);
	};

	handleChangeClass = (event) => {
		let selectedClass = event.target.value;
		//this.setState({selectedClass});
		this.props.changeClass(selectedClass);
		this.props.getListSubjectViaClass(selectedClass);

		//get slug
		let {classes} = this.state;
		let idx = _.findIndex(classes, ['id', parseInt(selectedClass)]);

		if (idx >= 0) {
			this.props.history.push('/cat/' + classes[idx].slug);
		}
	};

	render() {

		let {grade, classes, subjects, chapters,  selectedClass, subjectThumbnail, subjectName, tagsTrend} = this.state;

		return (
			<div className="row">
				<div className="master-filter-wrapper">
					<form action="" method="post" role="form">
						<div className="master-filter-search">
							<div className="form-group">
								<input type="text" className="form-control" name="" placeholder="Tìm kiếm tài liệu mong muốn ..."/>
							</div>
							<button type="submit" className="btn btn-primary master-filter-search-submit">
								<i className="fas fa-search"></i>
							</button>
						</div>

						<div className="master-filter-group">
							<div className="master-filter-select">
								<select name="name" className="form-control" onChange={this.handleChangeGrade} value={grade}>
									<option value="0"> -- Chọn cấp học --</option>
									<option value="1">Tiều học</option>
									<option value="2">Trung học cơ sở</option>
									<option value="3">Trung học phổ thông</option>
								</select>
							</div>

							<div className="master-filter-select">
								<select name="class" className="form-control" onChange={this.handleChangeClass} value={selectedClass}>
									<option value="0"> -- Chọn lớp học --</option>
									{_.map(classes, (c, idx) => {
										return (
											<option value={c.id} key={idx}>{c.name}</option>
										)
									})}
								</select>
							</div>
						</div>

						<div className="master-filter-box">
							{_.isEmpty(this.props.path) &&
								<Fragment>
									{_.map(subjects, (s, idx) => {
										return (
											<Link className="master-filter-item text-center" key={idx} to={this.props.history.location.pathname + '/' + s.slug}>
												<img src={s.thumbnail} alt="" className="img-responsive center-block"/>
												<h4 className="master-filter-item-title">{s.name}</h4>
											</Link>
										)
									})}
								</Fragment>
							}

							{(_.isEmpty(chapters) && !_.isEmpty(tagsTrend)) &&
								<div className="trend-wrapper">
									<span>Xu hướng :</span>
									<ul className="trend-link-list">
										{_.map(tagsTrend, (tag, key) => {
											return (
												<li key={key}>
													<Link to={''}>{tag.name}</Link>
												</li>
											)
										})}
									</ul>
								</div>
							}

							{!_.isEmpty(chapters) &&
								<div className="master-filter-box-chapter">
									<div className="master-filter-box-selected-subject">
										<div className="master-filter-item text-center">
											<img src={subjectThumbnail} alt={subjectName} className="img-responsive center-block"/>
											<h4 className="master-filter-item-title">{subjectName}</h4>
										</div>
									</div>

									<div className="master-filter-box-list-chapter">
										{_.map(chapters, (c, idx) => {
											return (
												<li className="master-filter-box-list-chapter-item" key={idx}>
													<Link to={'/chuyen-de/' + c.slug} title={c.name}><i className="fas fa-caret-right"></i> {c.name}</Link>
												</li>
											)
										})}
									</div>
								</div>
							}

						</div>

					</form>
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
		getClassInGrade: (grade) => {
			dispatch(action.getClassInGrade(grade))
		},

		getListSubjectViaClass: (classId) => {
			dispatch(action.getListSubjectViaClass(classId));
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

export default connect(mapStateToProps, mapDispatchToProps) (Filter);