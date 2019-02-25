import React, {Component} from 'react';
import Ads from "../home/Ads";
import DocumentTag from "../support/DocumentTag";
import {Link} from "react-router-dom";
import * as helper from "../../Support";
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import _ from 'lodash';
import Meta from "../support/Meta";
import Pagination from "../user/Pagination";
import queryString from 'query-string';

class TagCategory extends Component {

	constructor(props) {
		super(props);
		this.state = {
			documents: [],
			singleTag: {
				name: '',
				seo_title: '',
				seo_keywords: '',
				seo_description: ''
			},
			url: this.props.location.pathname
		}
	}

	componentDidMount = () => {
		let {slug} = this.props.match.params;
		this.props.getDocumentByTag(slug);
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props !== nextProps) {
			let oldSearch = this.props.location.search;
			let oldValue = queryString.parse(oldSearch);

			let search = nextProps.location.search;
			let value = queryString.parse(search);

			let {slug} = this.props.match.params;


			if (value.page !== oldValue.page) {
				this.props.getDocumentByTag(slug, value.page);
			}
		}

		if (this.props.TagCloudReducer.documents !== nextProps.TagCloudReducer.documents) {
			this.setState({
				documents: nextProps.TagCloudReducer.documents
			})
		}

		if (this.props.TagCloudReducer.singleTag !== nextProps.TagCloudReducer.singleTag) {
			this.setState({
				singleTag: nextProps.TagCloudReducer.singleTag
			})
		}

		return true;
	};

	clickPage = (onsort, page) => {
		let url = this.props.match.url;
		this.props.history.push(url + '?&page=' + page);
	};

	render() {

		let {documents, singleTag, url} = this.state;

		return (
			<div className="tag-list-wrapper">

				<Meta
					title={singleTag.name}
					description={singleTag.seo_description}
					keywords={singleTag.seo_description}
				/>

				<div className="container">
					<div className="tag-list-wrapper-inner col-xs-12">
						<h1 className="tag-list-title">Từ khóa: "{singleTag.name}" ({documents.total} kết quả)</h1>

						<div className="tag-list-wrapper-container">
							<div className="row">
								<div className="col-xs-12 col-md-9">
									<div className="tag-list-ads-wrapper">
										<img src="/lib/images/adsdownload.png" alt="" className="img-responsive center-block"/>
									</div>

									{_.map(documents.data, (d, idx) => {
										return (
											<div className="doc-item-horizontal" key={idx}>
												<div className="doc-item-horizontal-image">
													<DocumentTag
														format={d.formats}
													/>
													<Link to={'/tai-lieu/' + d.id + '-' + d.slug} title={d.name}>
														<img src={d.thumbnail ? d.thumbnail : '/lib/images/thumbnail.jpg'} alt="" className="img-responsive center-block"/>
													</Link>
												</div>
												<div className="doc-item-horizontal-info">
													<div className="doc-item-horizontal-info-infomation">
														<h4><Link to={'/tai-lieu/' + d.id + '-' + d.slug} title={d.name}>{d.name}</Link></h4>
														<div className="document-category-info">
															<Link to={'/cat/' + d.get_class.slug} className="document-category-class">
																{d.get_class.name}
															</Link>
															<Link to={'/cat/' + d.get_class.slug + '/' + d.get_subject.slug} className="document-category-subject">
																{d.get_subject.name}
															</Link>
														</div>
														<div className="doc-item-horizontal-info-infomation-content">
															{d.excerpt}
														</div>
													</div>
													<div className="document-info">
														<div className="document-info-page"><i className="far fa-file-alt"></i> {d.pages}</div>
														<div className="document-info-view"><i className="far fa-eye"></i> {d.views}</div>
														<div className="document-info-download"><i className="fas fa-file-download"></i> {d.downloaded}</div>
														<div className="document-info-price">{helper.convertPrice(d.price)}</div>
													</div>
												</div>
											</div>
										)
									})}

									{documents.last_page > 1 &&
										<Pagination
											url={url}
											current_page={documents.current_page}
											first_page_url={documents.first_page_url}
											last_page={documents.last_page}
											last_page_url={documents.last_page_url}
											next_page_url={documents.next_page_url}
											prev_page_url={documents.prev_page_url}
											clickPage={this.clickPage}
										/>
									}

								</div>

								<div className="col-xs-12 col-md-3">
									<Ads/>
								</div>
							</div>
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
		getDocumentByTag: (tagSlug, page = null) => {
			dispatch(actions.getDocumentByTag(tagSlug, page))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (TagCategory) ;