import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import * as action from './../../action/Index';
import _ from "lodash";
import {Link} from "react-router-dom";
import TopWeekDoc from "../doc/TopWeekDoc";
import {connect} from 'react-redux';

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
			subjectName: ''
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
				subjectSlug: nextProps.ChapterReducer.chapter.subject.slug
			})
		}

		return true;
	};

	render() {

		let {chapters, catName, catSlug, subjectName, subjectSlug} = this.state;

		return (
			<section className="document-wrapper">
				<div className="container">

					<Breadcrumb
						classSlug={catSlug}
						classLevel={catName}
						subject={subjectName}
						subjectSlug={subjectSlug}
					/>

					<div className="row">
						<div className="col-xs-12 col-md-9 document-detail">
							<div className="chapter-list">
								{_.map(chapters, (c, idx) => {
									return (
										<div className="chapter-item" key={idx}>
											<h4 className="chapter-title">
												{c.name}
												<span className="chapter-count-doc">{c.get_document.length} tải liệu</span>
											</h4>
											<div className="list-thematic">
												<ul>
													{_.map(c.get_thematic, (thematic, idx) => {
														return (
															<li key={idx}>
																<Link to={'/chuyen-de/' + thematic.slug}>
																	<i className="fas fa-long-arrow-alt-right"></i> {thematic.name}
																</Link>
															</li>
														)
													})}

												</ul>
											</div>
										</div>
									)
								})}
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
}

const mapDispatchToProps = (dispatch) => {
	return {
		getChapter: (categorySlug, subjectSlug) => {
			dispatch(action.getChapter(categorySlug, subjectSlug))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ListChapter);