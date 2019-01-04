import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import * as action from './../../action/Index';
import _ from "lodash";
import {Link} from "react-router-dom";
import TopWeekDoc from "../doc/TopWeekDoc";
import {connect} from 'react-redux';
import TreeCategory from "../sidebar/TreeCategory";
import TagCloud from "../home/TagCloud";
import SubjectList from "../home/SubjectList";
import Filter from "../home/Filter";
import List from "../listDoc/List";
import ListDocuments from "../listDoc/ListDocuments";
import Ads from "../home/Ads";
import TagsFooter from "../tags/TagsFooter";

class ListChapter extends Component {

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
			catId: 0,
			tagFooter: []
		}
	}

	componentDidMount = () => {
		let {catSlug, subjectSlug} = this.state;
		this.props.getChapter(catSlug, subjectSlug);
		this.props.getTagFooter(catSlug, subjectSlug);
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

		if (this.props.TagCloudReducer.tagsFooter !== nextProps.TagCloudReducer.tagsFooter) {
			this.setState({
				tagFooter: nextProps.TagCloudReducer.tagsFooter
			})
		}

		return true;
	};

	render() {

		let {chapters, catName, catSlug, subjectName, subjectSlug, subjectThumbnail, tagFooter} = this.state;

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
							<ListDocuments/>
						</div>
					</div>

					<div className="col-xs-12 col-md-3 sticky-sidebar">
						<Ads/>
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
		getChapter: (categorySlug, subjectSlug) => {
			dispatch(action.getChapter(categorySlug, subjectSlug))
		},

		getTagFooter: (className, subjectName) => {
			dispatch(action.getTagFooter(className, subjectName))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ListChapter);