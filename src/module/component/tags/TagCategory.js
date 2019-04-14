import React, {Component, Fragment} from 'react';
import Ads from "../home/Ads";
import DocumentTag from "../support/DocumentTag";
import {Link, NavLink} from "react-router-dom";
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

									<div className="document-list-wrapper document-view_list">
										{_.map(documents.data, (value, index) => {
											console.log(value);
											return (
												<div className="document-items" key={index}>
													<div className="document-img">
														<div className="document-link">
															<Link title={value.get_class.name} to={'/'+value.get_class.slug+'/d0s0c' + value.get_class.id+'t0'} className="btn vj-btn document-class">
																{value.get_class.name}
															</Link>
															<Link title={value.get_subject.name} to={'/'+value.get_subject.slug+'-'+value.get_class.slug+'/d0s' + value.get_subject.id+'c'+value.get_class.id+'t0'} className="btn document-subject">
																{value.get_subject.name}
															</Link>
														</div>
														<DocumentTag format={value.formats} />
														<Link to={'/tai-lieu/' + value.id + '-' + value.slug} className="document-thumbnail" title={value.name}>
															{_.isEmpty(value.thumbnail) ? (
																<img src="/lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
															) : (
																<img src={value.thumbnail} alt="" className="img-responsive center-block"/>
															)}
														</Link>
													</div>
													<div className="document-content">
														<Link to={'/tai-lieu/' + value.id + '-' + value.slug} className="document-title" title={value.name}>
															{value.name}
														</Link>
														<div className="document-excerpt">{value.excerpt}</div>
														<div className="document-type">
															<strong>Loại: </strong>
															<a href="#">Bài giảng</a>,
															<a href="#">Chuyên đề</a>
														</div>
													</div>
													<div className="document-right">
														<div className="document-price">
															<span className="price">{value.formated_price}</span>
														</div>
														<div className="document-star">
															<span className="star"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fal fa-star"></i></span>
														</div>
														<NavLink
															to={{ pathname: '/trang-ca-nhan/'+ value.get_member.id, search: 'onsort=all'}}
															className="document-author"
															title={value.get_member.first_name + ' ' + value.get_member.last_name}
														>
															<i className="fal fa-user"></i> {value.get_member.first_name} {value.get_member.last_name}
														</NavLink>
														<div className="document-info">
															<div className="document-info-page"><i className="fal fa-file-alt"></i> {value.pages}</div>
															<div className="document-info-view"><i className="fal fa-eye"></i> {value.views}</div>
															<div className="document-info-download"><i className="fal fa-download"></i> {value.downloaded}</div>
														</div>
													</div>
												</div>
											)
										})}
									</div>

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