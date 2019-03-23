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
			chapterSlug: '',
			thematic: '',
			thematicSlug: '',
			classId:'',
			subjectId:'',
		}
	}

	componentDidMount = () => {
		let {classSlug, classLevel, subject, subjectSlug, chapter, chapterSlug, thematic, thematicSlug,classId,subjectId} = this.props;
		this.setState({
			classSlug, classLevel, subject, subjectSlug, chapter, chapterSlug, thematic, thematicSlug,classId,subjectId
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props !== nextProps) {
			this.setState({
				classLevel: nextProps.classLevel,
				subject: nextProps.subject,
				chapter: nextProps.chapter,
				classSlug: nextProps.classSlug,
				subjectSlug: nextProps.subjectSlug,
				chapterSlug: nextProps.chapterSlug,
				thematic: nextProps.thematic,
				thematicSlug: nextProps.thematicSlug,
				classId: nextProps.classId,
				subjectId: nextProps.subjectId
			})
		}

		return true;
	};

	render() {

		let {classSlug, classLevel, subject, subjectSlug, chapter, chapterSlug, thematic, thematicSlug,classId,subjectId} = this.state;

		return (
			<div className="vj-breadcrumb">
					<Link to="/">Trang chủ</Link>
					<Link to={'/'+classSlug+'/d0s0c'+classId+'t0'}>{classLevel}</Link>
					{subject &&
						<Link to={'/'+subjectSlug+'-'+classSlug+'/d0s'+subjectId+'c'+classId+'t0'}>{subject}</Link>
					}

					{(chapter && thematic) &&
						<span>{chapter}</span>
					}

					{chapter && //Url den chapter la url cuoi cung
						<span>{chapter}</span>
					}

					{thematic &&
						<span>{thematic}</span>
					}
			</div>
		);
	}
}

export default Breadcrumb;