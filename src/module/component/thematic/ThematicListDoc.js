import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import List from "../listDoc/List";
import FilterBox from "../listDoc/FilterBox";
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import {Link} from "react-router-dom";
import _ from 'lodash';
import FilterList from "../listDoc/FilterList";

class ThematicListDoc extends Component {

	constructor(props) {
		super(props);
		this.state = {
			catName: '',
			catSlug: '',
			subjectName: '',
			subjectSlug: '',
			chapterName: '',
			chapterSlug: '',
			thematicSlug: this.props.match.params.thematic,
			thematicName: '',
			documents: [],
			thematicList: [{
				get_document: []
			}]
		}
	}

	componentDidMount = () => {
		let {thematicSlug} = this.state;
		this.props.getDocInThematic(thematicSlug);
		let {thematic} = this.props.ThematicReducer;
		this.setState({thematicList: thematic})
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.location !== nextProps.location) {
			this.setState({
				thematicSlug: nextProps.match.params.thematic
			});

			this.props.getDocInThematic(nextProps.match.params.class);
		}

		if (this.props.ThematicReducer.docInThematic !== nextProps.ThematicReducer.docInThematic) {
			this.setState({
				documents: nextProps.ThematicReducer.docInThematic.document,
				catName: nextProps.ThematicReducer.docInThematic.thematic.get_chapter.get_category.name,
				catSlug: nextProps.ThematicReducer.docInThematic.thematic.get_chapter.get_category.slug,
				subjectName: nextProps.ThematicReducer.docInThematic.thematic.get_chapter.get_subject.name,
				subjectSlug: nextProps.ThematicReducer.docInThematic.thematic.get_chapter.get_subject.slug,
				chapterName: nextProps.ThematicReducer.docInThematic.thematic.get_chapter.name,
				chapterSlug: nextProps.ThematicReducer.docInThematic.thematic.get_chapter.slug,
			});

			this.props.getThematicInChapter(nextProps.ThematicReducer.docInThematic.thematic.get_chapter.id)
		}

		if (this.props.ThematicReducer.thematic != nextProps.ThematicReducer.thematic) {
			this.setState({
				thematicList: nextProps.ThematicReducer.thematic
			})
		}

		return true;
	};

	render() {

		let {
			catName,  catSlug,  subjectName,  subjectSlug,  chapterName,  chapterSlug,  thematicSlug,  thematicName,
			documents, thematicList
		} = this.state;

		return (
			<section className="document-wrapper">
				<div className="container">

					<Breadcrumb
						classSlug={catSlug}
						classLevel={catName}
						subjectSlug={subjectSlug}
						subject={subjectName}
						chapterSlug={chapterSlug}
						chapter={chapterName}
					/>

					<div className="row">
						<div className="col-xs-12 col-md-9 document-detail col-md-push-3">
							<div className="document-list">

								<FilterList/>

								<div className="document-list-wrapper">
									<div className="row">
										{_.map(documents.data, (value, index) => {
											return (
												<div className="col-xs-6 col-md-3 col-lg-3" key={index}>
													<div className="document-item">
														<Link to={'/tai-lieu/' + value.id} className="document-thumbnail">
															<img src="/lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
														</Link>
														<Link to={'/tai-lieu/' + value.id} className="document-title">
															{value.name}
														</Link>
														<Link to={'/tai-lieu/' + value.id} className="document-author">
															{value.get_member.first_name} {value.get_member.last_name}
														</Link>
														<div className="document-info">
															<div className="document-info-page"><i className="far fa-file-alt"></i> {value.pages}</div>
															<div className="document-info-view"><i className="far fa-eye"></i> {value.views}</div>
															<div className="document-info-download"><i className="fas fa-file-download"></i> {value.downloaded}</div>
														</div>
													</div>
												</div>
											)
										})}
									</div>
								</div>
							</div>
						</div>

						<div className="col-xs-12 col-md-3 doc-list-filter-box col-md-pull-9">
							<FilterBox
								title={'Danh sách lớp'}
								type={'classes'}
							/>

							<div className="related">
								<div className="related-title"><h4>CÁC CHUYÊN ĐỀ KHÁC TRONG CHƯƠNG</h4></div>
								<div className="widget-content">
									<div className="related-wrapper">
										{_.map(thematicList, (thematic, idx) => {
											return (
												<div className="related-item" key={idx}>
													<div className="related-item-title"><Link
														to={"/chuyen-de/" + thematic.slug}><i className="fas fa-book"></i> {thematic.name}</Link>
														<span className="related-thematic-count">{thematic.get_document.length} tài liệu</span>
													</div>
												</div>
											)
										})}

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getDocInThematic: (chapterSlug) => {
			dispatch(action.getDocInThematic(chapterSlug))
		},

		getThematicInChapter: (chapterId) => {
			dispatch(action.getThematic(chapterId))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ThematicListDoc);