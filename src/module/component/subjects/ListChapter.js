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
import * as api from "../../const/Api";
import axios from "axios";
import Meta from "../support/Meta";
import FilterBar from "../sidebar/FilterBar";

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
			tagsTrend: [],
			tagFooter: [],
			items: {
				data: []
			},
		}
	}

	componentDidMount = () => {
		let {catSlug, subjectSlug} = this.state;
		this.props.getChapter(catSlug, subjectSlug);
		this.props.getTagFooter(catSlug, subjectSlug);

		this.fetchData({ catSlug, subjectSlug });
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
				subjectThumbnail: nextProps.ChapterReducer.chapter.subject.thumbnail,
				tagsTrend: nextProps.ChapterReducer.chapter.tagsTrend
			});

			let catId = nextProps.ChapterReducer.chapter.category.id;
			let subId = nextProps.ChapterReducer.chapter.subject.id;

			this.fetchData(catId, subId);
		}

		if (this.props.TagCloudReducer.tagsFooter !== nextProps.TagCloudReducer.tagsFooter) {
			this.setState({
				tagFooter: nextProps.TagCloudReducer.tagsFooter
			})
		}

		return true;
	};

	fetchData = (classesId, subjectId) => {

		let apiUrl = api.API_LIST_DOC;

		this.setState({
			onLoading: true,
		});

		axios.get(apiUrl, {
			params: { classesId, subjectId }
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

		let {chapters, catName, catSlug, subjectName, subjectSlug, subjectThumbnail, tagFooter, tagsTrend, items} = this.state;

		return (
			<div className="container wrap__page">
				<div className="wrap__left">
					<FilterBar
						history={this.props.history}
					/>
				</div>
				<div className="wrap__right">
					<Meta
						title={subjectName + ' - ' + catName}
						description={subjectName + ' - ' + catName}
						keywords={subjectName + ' - ' + catName}
					/>
					<Breadcrumb
						classSlug={catSlug}
						classLevel={catName}
						subject={subjectName}
						subjectSlug={subjectSlug}
					/>

					<ListDocuments items={items.data}/>

					<TagsFooter
						classLevel={catName}
						tags={tagFooter}
					/>
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
		},

		getTagFooter: (className, subjectName) => {
			dispatch(action.getTagFooter(className, subjectName))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ListChapter);
