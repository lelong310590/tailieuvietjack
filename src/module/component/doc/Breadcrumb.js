import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Breadcrumb extends Component {

	constructor(props) {
		super(props);
		this.state = {
			classSlug: '',
			classLevel: '',
			subject: '',
			subjectSlug: '',
			chapter: '',
			chapterSlug: ''
		}
	}

	componentDidMount = () => {
		let {classSlug, classLevel, subject, subjectSlug, chapter, chapterSlug} = this.props;
		this.setState({
			classSlug, classLevel, subject, subjectSlug, chapter, chapterSlug
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.classLevel !== nextProps.classLevel) {
			this.setState({
				classLevel: nextProps.classLevel
			})
		}

		if (this.props.subject !== nextProps.subject) {
			this.setState({
				subject: nextProps.subject
			})
		}

		if (this.props.chapter !== nextProps.chapter) {
			this.setState({
				chapter: nextProps.chapter
			})
		}

		return true;
	};

	render() {

		let {classSlug, classLevel, subject, subjectSlug, chapter, chapterSlug} = this.state;

		return (
			<div className="breadcrumb-wrapper">
				<ul>
					<li><Link to="/"><i className="fas fa-home"></i> Trang chủ</Link></li>
					<li><Link to={'/cat/' + classSlug}><i className="fas fa-chevron-right"></i> {classLevel}</Link></li>
					{subject &&
						<li><Link to={'/cat/' + classSlug + '/' + subjectSlug}><i className="fas fa-chevron-right"></i> {subject}</Link></li>
					}

					{chapter &&
						<li><Link to={'/chuyen-de/' + chapterSlug}><i className="fas fa-chevron-right"></i> {chapter}</Link></li>
					}
				</ul>
			</div>
		);
	}
}

export default Breadcrumb;