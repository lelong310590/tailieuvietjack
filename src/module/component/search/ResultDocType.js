import React, {Component, Fragment} from 'react';
import Meta from "../support/Meta";
import FilterBar from "../sidebar/FilterBar";
import TagCloud from "../home/TagCloud";
import SpecialDocument from "../listDoc/SpecialDocument";
import {connect} from'react-redux';
import axios from 'axios';
import * as api from './../../const/Api';
import * as action from './../../action/Index';
import _ from "lodash";
import {Link, NavLink} from "react-router-dom";
import DocumentTag from "../support/DocumentTag";
import * as helper from "../../Support";
import Pagination from "../user/Pagination";
import queryString from 'query-string';

class ResultDocType extends Component {

	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			seokeywords: '',
			slug: this.props.match.params.slug,
			page: 1,
			url: this.props.location.pathname,
			documents: {
				data: []
			},
			viewStyle: 'list'
		};
	}

	componentDidMount = () => {
		this.fetchData(this.props);
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props !== nextProps) {
			let oldSearch = this.props.location.search;
			let oldValue = queryString.parse(oldSearch);

			let search = nextProps.location.search;
			let value = queryString.parse(search);

			if (value.page !== oldValue.page) {
				this.fetchData(nextProps, value.page);
			}
		}

		if (this.props.match.url !== nextProps.match.url) {
			let {slug} = nextProps.match.url;
			this.fetchData(nextProps);
		}

		if (this.props.FilterBarReducer.viewStyle !== nextProps.FilterBarReducer.viewStyle) {
			this.setState({
				viewStyle: nextProps.FilterBarReducer.viewStyle
			})
		}

		if (this.props.FilterBarReducer.documents !== nextProps.FilterBarReducer.documents) {
			this.setState({
				documents: nextProps.FilterBarReducer.documents
			});
		}

		return true;
	};

	//Fetch data
	fetchData = (props, page = 1) => {
		let {
			selectedDocTypes, selectedClasses, selectedSubject, selectedFormat, selectedPrice, selectedChapter,
			keywords
		} = props.FilterBarReducer;

		this.props.getResult(keywords, selectedDocTypes, selectedClasses, selectedSubject, selectedChapter, selectedFormat, selectedPrice, page);

		axios.get(api.GET_META_DATA, {
			params: {
				docType: selectedDocTypes,
				classes: selectedClasses,
				subject: selectedSubject,
				price: selectedPrice
			}
		})
			.then(response => {
				this.setState({
					title: response.data.title,
					description: response.data.description,
				})
			})
			.catch(err => {
				console.log(err)
			})
	};

	handleChangeViewStyle = (viewStyle) => {
		this.props.handleChangeView(viewStyle)
	};

	clickPage = (page) => {
		let url = this.props.match.url;
		this.props.history.push(url + '&page=' + page);
	};

	render() {

		let {title, viewStyle, documents, url} = this.state;

		return (
			<Fragment>

				<Meta
					title={title}
				/>

				<div className="document-wrapper home-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-3">

								<FilterBar
									history={this.props.history}
								/>

								<div style={{marginTop: '20px'}}>
									<TagCloud
										history={this.props.history}
									/>
								</div>
							</div>

							<div className="col-xs-12 col-md-9">

								<div className="category-document-wrapper">
									<SpecialDocument/>

									<div className="category-document-filter" style={{ marginBottom: "20px" }}>
										<div className="category-document-filter-order">
											<div className="category-document-filter-order-item">
												<span>Mới nhất</span>
											</div>
											<div className="category-document-filter-order-item">
												<span>Được quan tâm nhất</span>
											</div>
										</div>
										<div className="category-document-filter-view">
											<div className="category-document-filter-view-item"
											     onClick={() => this.handleChangeViewStyle('list')}
											>
												<i className="fas fa-th-list" style={{ color: viewStyle === 'list' ? '#ff9700': null }}></i>
											</div>
											<div className="category-document-filter-view-item"
											     onClick={() => this.handleChangeViewStyle('grid')}>
												<i className="fas fa-th-large" style={{ color: viewStyle === 'grid' ? '#ff9700': null }}></i>
											</div>
										</div>
									</div>

									{(viewStyle === 'grid') ? (
										<div className="row">
											{
												_.map(documents.data, (value, index) => {
													return (
														<div className="col-xs-6 col-md-3 col-lg-3" key={index}>
															<div className="document-item">
																<Link to={'/tai-lieu/' + value.id} className="document-thumbnail">
																	<DocumentTag
																		format={value.formats}
																	/>

																	{value.thumbnail !== null ? (
																		<img src={value.thumbnail} alt=""
																		     className="img-responsive center-block"/>
																	) : (
																		<img src="/lib/images/thumbnail.jpg" alt=""
																		     className="img-responsive center-block"/>
																	)}
																</Link>
																<Link to={'/tai-lieu/' + value.id} className="document-title">
																	{value.name}
																</Link>
																<div className="document-price">
																	{value.formated_price}
																</div>
																<div className="document-category-info">
																	<Link to={'/cat/' + value.get_class.slug} className="document-category-class">
																		{value.get_class.name}
																	</Link>
																	<Link to={'/cat/' + value.get_class.slug + '/' + value.get_subject.slug} className="document-category-subject">
																		{value.get_subject.name}
																	</Link>
																</div>
																<NavLink
																	to={{ pathname: '/trang-ca-nhan/'+ value.get_member.id, search: 'onsort=all'}}
																	className="document-author"
																	title={value.get_member.first_name + ' ' + value.get_member.last_name}
																>
																	{value.get_member.first_name} {value.get_member.last_name}
																</NavLink>
																<div className="document-info">
																	<div className="document-info-page">
																		<i className="far fa-file-alt"></i> {value.pages}
																	</div>
																	<div className="document-info-view">
																		<i className="far fa-eye"></i> {value.views}
																	</div>
																	<div className="document-info-download">
																		<i className="fas fa-file-download"></i> {value.downloaded}
																	</div>
																</div>
															</div>
														</div>
													)
												})
											}
										</div>
									) : (
										<div className="tag-list-wrapper">
											{
												_.map(documents.data, (value, index) => {
													return (
														<Fragment key={index}>
															<div className="doc-item-horizontal">
																<div className="doc-item-horizontal-image">
																	<DocumentTag
																		format={value.formats}
																	/>
																	<Link to={'/tai-lieu/' + value.id + '-' + value.slug} title={value.name}>
																		<img src={value.thumbnail ? value.thumbnail : '/lib/images/thumbnail.jpg'} alt="" className="img-responsive center-block"/>
																	</Link>
																</div>
																<div className="doc-item-horizontal-info">
																	<div className="doc-item-horizontal-info-infomation">
																		<h4><Link to={'/tai-lieu/' + value.id + '-' + value.slug} title={value.name}>{value.name}</Link></h4>
																		<div className="document-category-info">
																			<Link to={'/cat/' + value.get_class.slug} className="document-category-class">
																				{value.get_class.name}
																			</Link>
																			<Link to={'/cat/' + value.get_class.slug + '/' + value.get_subject.slug} className="document-category-subject">
																				{value.get_subject.name}
																			</Link>
																		</div>
																		<div className="doc-item-horizontal-info-infomation-content">
																			{value.excerpt}
																		</div>
																	</div>
																	<div className="document-info">
																		<div className="document-info-page"><i className="far fa-file-alt"></i> {value.pages}</div>
																		<div className="document-info-view"><i className="far fa-eye"></i> {value.views}</div>
																		<div className="document-info-download"><i className="fas fa-file-download"></i> {value.downloaded}</div>
																		<div className="document-info-price">{helper.convertPrice(value.price)}</div>
																	</div>
																</div>
															</div>

															{((index + 1) % 5 === 0) &&
															<div className="document-middle-ads">
																<img src="/lib/images/document-ads.jpg" alt="" className="img-responsive center-block"/>
															</div>
															}
														</Fragment>
													)
												})
											}
										</div>
									)}

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
							</div>
						</div>
					</div>
				</div>

			</Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleChangeView: (data) => {
			dispatch(action.handleChangeView(data));
		},

		getResult: (keyword = null, docTypeId = null, classesId = null, subjectId = null, chapterId = null, formatId = null, price = null, page = 1) => {
			dispatch(action.getResult(keyword, docTypeId, classesId, subjectId, chapterId, formatId, price, page));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (ResultDocType);