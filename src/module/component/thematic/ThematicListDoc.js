import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import List from "../listDoc/List";
import FilterBox from "../listDoc/FilterBox";
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import {Link} from "react-router-dom";
import _ from 'lodash';
import FilterList from "../listDoc/FilterList";
import Filter from "../home/Filter";

class ThematicListDoc extends Component {

	constructor(props) {
		super(props);
		this.state = {
			chapters: [{
				name: '',
				get_document: [],
				get_thematic: []
			}],
			catSlug: this.props.match.params.class,
			subjectSlug: this.props.match.params.subject,
			catName: '',
			subjectName: '',
			subjectThumbnail: '',
			catId: 0
		}
	}

	componentDidMount = () => {
		let {catSlug, subjectSlug} = this.state;
		this.props.getChapter(catSlug, subjectSlug);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.location !== nextProps.location) {
			this.setState({
				catSlug: nextProps.match.params.class,
				subjectSlug: nextProps.match.params.subject
			});

			this.props.getChapter(nextProps.match.params.class, nextProps.match.params.subject);
		}

		if (this.props.ChapterReducer !== nextProps.ChapterReducer) {
			this.setState({
				chapters: nextProps.ChapterReducer.chapter.chapters,
				catName: nextProps.ChapterReducer.chapter.category.name,
				catSlug: nextProps.ChapterReducer.chapter.category.slug,
				subjectName: nextProps.ChapterReducer.chapter.subject.name,
				subjectSlug: nextProps.ChapterReducer.chapter.subject.slug,
				subjectThumbnail: nextProps.ChapterReducer.chapter.subject.thumbnail
			})
		}

		return true;
	};

	render() {

		let {chapters, catName, catSlug, subjectName, subjectSlug, subjectThumbnail} = this.state;

		return (
			<div className="document-wrapper home-wrapper">
				<div className="container">
					<Breadcrumb
						classSlug={catSlug}
						classLevel={catName}
						subject={subjectName}
						subjectSlug={subjectSlug}
					/>

					<div className="col-xs-12 col-md-9">

						<Filter
							history={this.props.history}
							chapters={chapters}
							subjectName={subjectName}
							subjectThumbnail={subjectThumbnail}
						/>

						<div className="row">
							<List
								title={'Tài liệu nổi bật'}
								itemClass={'col-xs-6 col-md-3 col-lg-3'}
							/>
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
		getChapter: (categorySlug, subjectSlug) => {
			dispatch(action.getChapter(categorySlug, subjectSlug))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ThematicListDoc);