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
import ListDocuments from "../listDoc/ListDocuments";
import * as api from "../../const/Api";
import axios from "axios";

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
		let {catSlug, subjectSlug } = this.state;
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

			let {catSlug, subjectSlug, thematicSlug } = this.state;
			this.fetchData({
				catSlug,
				subjectSlug,
				thematicSlug
			});
		}

		return true;
	};

	fetchData = ({ catSlug, subjectSlug, thematicSlug }) => {

		let apiUrl = api.API_LIST_DOC;

		this.setState({
			onLoading: true,
		});

		axios.get(apiUrl, {
			params: { catSlug, subjectSlug, thematicSlug }
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

		let {chapters, catName, catSlug, subjectName, subjectSlug, subjectThumbnail, items} = this.state;

		return (
			<div className="container wrap__page">
				<div className="wrap__left">
					<Filter
						history={this.props.history}
						chapters={chapters}
						subjectName={subjectName}
						subjectThumbnail={subjectThumbnail}
					/>
					<List
						title={'Tài liệu nổi bật'}
					/>
				</div>
				<div className="wrap__right">
					<Breadcrumb
						classSlug={catSlug}
						classLevel={catName}
						subject={subjectName}
						subjectSlug={subjectSlug}
					/>
					<ListDocuments items={items}/>
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
