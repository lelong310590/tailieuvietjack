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
			url: this.props.match.url,
			documents: {
				data: [],
				total:0
			},
			viewStyle: 'list',
			keyword: ''
		};
	}

	componentDidMount = () => {
		let search = this.props.location.search;
		let value = queryString.parse(search);
		if (_.has(value, 'keyword')) {
			let {
				selectedDocTypes, selectedClasses, selectedSubject, selectedFormat, selectedPrice, selectedChapter,
			} = this.props.FilterBarReducer;
			this.props.getResult(value.keyword, selectedDocTypes, selectedClasses, selectedSubject, selectedChapter, selectedFormat, selectedPrice);
		}else{
			this.fetchData(this.props);
		}
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

		if (this.props.location.pathname !== nextProps.location.pathname) {
			// let {slug} = nextProps.match.url;
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
	fetchData = (props, page = 1,order='new') => {
		const search = props.location.search;
		let value = queryString.parse(search);

		let {
			selectedDocTypes, selectedClasses, selectedSubject, selectedFormat, selectedPrice, selectedChapter,
			keywords
		} = props.FilterBarReducer;

		let {params} = props.match;

		if (_.has(params, 'code')) {
			let str = params.code.split('&')[0];
			selectedDocTypes = str.substring(
				str.lastIndexOf("d") + 1,
				str.lastIndexOf("s")
			);

			selectedSubject = str.substring(
				str.lastIndexOf("s") + 1,
				str.lastIndexOf("c")
			);

			selectedClasses = str.substring(
				str.lastIndexOf("c") + 1,
				str.lastIndexOf("t")
			);

			selectedChapter = str.substring(
				str.lastIndexOf("t") + 1,
			);

			this.setState({
				selectedDocTypes, selectedSubject, selectedClasses, selectedChapter
			})
		}

		if (_.has(value, 'price')) {
			selectedPrice = value.price;

		}
		if (_.has(value, 'keyword')) {
			this.setState({
				keyword: value.keyword
			})

		}
		let pathname = this.props.location.pathname;
		let afterPrice = pathname.split('price=')[1];
		if(afterPrice!==undefined&&afterPrice.length>0){
			let firstPrice = afterPrice.charAt(0);
			if(firstPrice=='-'){
				selectedPrice = -1;
			}else{
				selectedPrice = firstPrice;
			}
		}else{
			selectedPrice = -1;
		}
		this.props.getResult(keywords, selectedDocTypes, selectedClasses, selectedSubject, selectedChapter, selectedFormat, selectedPrice, page,order);

		axios.get(api.GET_META_DATA, {
			params: {
				docType: selectedDocTypes,
				classes: selectedClasses,
				subject: selectedSubject,
				price: selectedPrice,
				chapter: selectedChapter
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

	handleOrderBy = (order) => {
		//console.log(this.props);
		// let {
		// 	keywords, selectedDocTypes,selectedClasses,selectedSubject,selectedChapter,selectedFormat,selectedPrice
		// } = this.props.FilterBarReducer;
		//
		// this.props.getResult(keywords,selectedDocTypes, selectedClasses, selectedSubject, selectedChapter, selectedFormat, selectedPrice, this.props.FilterBarReducer.documents.current_page, order);
		this.fetchData(this.props,1,order);
	}

	handleChangeViewStyle = (viewStyle) => {
		this.props.handleChangeView(viewStyle)
	};

	clickPage = (page) => {
		let url = this.props.match.url;
		this.props.history.push(url + '&page=' + page);
	};

	render() {

		let {title, viewStyle, documents, url,keyword} = this.state;

		return (
			<Fragment>

				<Meta
					title={title}
				/>

				<div className="container wrap__page">
					<div className="wrap__left">
						<FilterBar
							history={this.props.history}
							location={this.props.location}
							match={this.props.match}
						/>
						<TagCloud
							history={this.props.history}
						/>
					</div>

					<div className="wrap__right">
						<div className="vj-breadcrumb">
							<a href="/">Trang chủ</a>
							<span>Tìm kiếm {keyword}</span>
						</div>
						<div className="wrap__title">Tài liệu nổi bật</div>
						<div className="docment-top">
							<div className="document-list-wrapper">
								{
									_.map(documents.data, (value, index) => {
										if(index < 4){
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
														<div className="document-price">
															<span className="price">{value.formated_price}</span>
															<span className="star"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fal fa-star"></i></span>
														</div>
														<NavLink
															to={{ pathname: '/trang-ca-nhan/'+ value.get_member.id, search: 'onsort=all'}}
															className="document-author"
															title={value.get_member.first_name + ' ' + value.get_member.last_name}
														>
															<i className="fal fa-user"></i> {value.get_member.first_name} {value.get_member.last_name}
														</NavLink>
													</div>
													<div className="document-info">
														<div className="document-info-page"><i className="fal fa-file-alt"></i> {value.pages}</div>
														<div className="document-info-view"><i className="fal fa-eye"></i> {value.views}</div>
														<div className="document-info-download"><i className="fal fa-download"></i> {value.downloaded}</div>
													</div>
												</div>
											)
										}
									})
								}
							</div>
						</div>

						<div className="wrap__title search_title">
							<SpecialDocument location={this.props.location}/>
							<div className="search-title">Tìm kiếm: {keyword} <span className="count">Tổng số tài liệu: {documents.total}</span></div>
							<div className="search-sort">
								<ul>
									<li>
										<span>Sắp xếp theo <i className="far fa-chevron-down"></i></span>
										<ul>
											<li><a href="javascript:void(0)" onClick={() => this.handleOrderBy('new')}>Mới nhất</a></li>
											<li><a href="javascript:void(0)" onClick={() => this.handleOrderBy('view')}>Được quan tâm nhất</a></li>
										</ul>
									</li>
								</ul>
								<a className="btn-view" onClick={() => this.handleChangeViewStyle('list')}>
									<i className="fal fa-list" style={{ color: viewStyle === 'list' ? '#ff9700': null }}></i>
								</a>
								<a className="btn-view" onClick={() => this.handleChangeViewStyle('grid')}>
									<i className="fal fa-th-large" style={{ color: viewStyle === 'grid' ? '#ff9700': null }}></i>
								</a>
							</div>
						</div>
						<div className="category-document-wrapper">

							{(viewStyle === 'grid') ? (
								<div className="document-list-wrapper">
									{
										_.map(documents.data, (value, index) => {
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
														<div className="document-price">
															<span className="price">{value.formated_price}</span>
															<span className="star"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fal fa-star"></i></span>
														</div>
														<NavLink
															to={{ pathname: '/trang-ca-nhan/'+ value.get_member.id, search: 'onsort=all'}}
															className="document-author"
															title={value.get_member.first_name + ' ' + value.get_member.last_name}
														>
															<i className="fal fa-user"></i> {value.get_member.first_name} {value.get_member.last_name}
														</NavLink>
													</div>
													<div className="document-info">
														<div className="document-info-page"><i className="fal fa-file-alt"></i> {value.pages}</div>
														<div className="document-info-view"><i className="fal fa-eye"></i> {value.views}</div>
														<div className="document-info-download"><i className="fal fa-download"></i> {value.downloaded}</div>
													</div>
												</div>
											)
										})
									}
								</div>
							) : (
								<div className="document-list-wrapper document-view_list">
									{
										_.map(documents.data, (value, index) => {
											return (
												<Fragment key={index}>
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

		getResult: (keyword = null, docTypeId = null, classesId = null, subjectId = null, chapterId = null, formatId = null, price = null, page = 1, order='new') => {
			dispatch(action.getResult(keyword, docTypeId, classesId, subjectId, chapterId, formatId, price, page,order));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps) (ResultDocType);