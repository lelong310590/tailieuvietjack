import React, {Component, Fragment} from 'react';
import List from "../listDoc/List";
import Related from "./Related";
import Infomation from "./Infomation";
import Tags from "./Tags";
import FacebookComment from "./FacebookComment";
import Comment from "./Comment";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import _ from 'lodash';
import * as api from './../../const/Api';
import axios from 'axios';
import Meta from "../support/Meta";
import ReactHtmlParser from 'react-html-parser';
import Loading from "../support/Loading";
import {Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ReportDocument from "./ReportDocument";
import LoginPopup from "./LoginPopup";
import * as helper from './../../Support';
import {connect} from "react-redux";

class Document extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			slug: this.props.match.params,
			status: 'active',
			name: '',
			pages: 0,
			views: 0,
			download: 0,
			ownerFirstName: '',
			ownerLastName: '',
			ownerAvatar: null,
			ownerId: 0,
			seo_title: '',
			seo_description: '',
			content: '',
			pageHtml: [],
			classLevel: {
				id: 0,
				name: '',
				slug: ''
			},
			subject: {
				id: 0,
				name: '',
				slug: ''
			},
			chapter:0,
			tags: [],

			pageLoadDone: false,
			showReport: false,
			footerDocument: true,
			showLoginPopup: false,
			type:0,
			previewfile: '',
			formats: ''
		};
	}

	componentDidMount = () => {

		let elem = document.querySelector('#footer');
		let location = helper.getElemDistance(elem);

		document.addEventListener('scroll', () => {
			if (window.scrollY > location) {
				this.setState({ footerDocument: false })
			} else {
				this.setState({ footerDocument: true })
			}
		});

		let {slug} = this.props.match.params;
		this.fetchData(slug);
		this.updateStatics('views', slug);
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.match.params.slug !== nextProps.match.params.slug) {
			this.setState({pageLoadDone: false});
			let {slug} = nextProps.match.params;
			this.fetchData(slug);
			this.updateStatics('views', slug);
		}

		return true;
	};

	updateStatics = (type, docId) => {
		let formData = new FormData();
		formData.append('type', type);
		formData.append('docId', docId);
		axios.post(api.API_UPDATE_DOC_STATIC, formData, {
			headers: {'Content-Type': 'multipart/form-data' }
		})
			.then(response => {
				this.setState({
					views: parseInt(response.data)
				})
			})
			.catch((err => {}))
	};

	fetchData = (slug) => {
		axios.get(api.API_GET_DOC_DETAIL, {
			params: {
				docId: parseInt(slug)
			}
		})
			.then(response => {
				let previewfile='';
				if(response.data.preview_file!==null){
					previewfile = response.data.preview_file;
				}
				this.setState({
					name: response.data.name,
					pages: response.data.pages,
					views: response.data.views,
					download: response.data.downloaded,
					status: response.data.status,
					ownerFirstName: response.data.get_member.first_name,
					ownerLastName: response.data.get_member.last_name,
					ownerAvatar: response.data.get_member.thumbnail,
					ownerId: response.data.get_member.id,
					seo_title: response.data.name,
					seo_description: response.data.excerpt,
					pageHtml: response.data.previewHtml,
					classLevel: response.data.get_class,
					subject: response.data.get_subject,
					tags: response.data.get_tags,
					content: response.data.content,
					id: response.data.id,
					type: response.data.type,
					previewfile: previewfile,
					chapter:response.data.chapter_id,
					formats:response.data.formats
				})
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				this.setState({pageLoadDone: true})
			})
	};

	clickToDownload = (slug) => {

		let token = localStorage.getItem('accessToken');

		if (_.isEmpty(token)) {
			//alert('Bạn phải đăng nhập để tải tài liệu');
			this.setState({showLoginPopup: true})
			return false;
		}

		let {status} = this.state;
		if (status === 'active') {
			this.props.history.push('/tai-lieu/download/' + slug);
		} else {
			alert('Tài liệu này đang chờ duyệt')
		}
	};

	reportDocument = () => {
		this.setState({showReport: true})
	};

	closeReport = () => {
		this.setState({showReport: false})
	};

	closeLoginPopup = () => {
		this.setState({showLoginPopup: false})
	};

	commentfeedback = () => {
		if(!this.props.AuthReducer.loggedIn){
			this.setState({showLoginPopup: true});
		}else{
			this.setState({showLoginPopup: false});
		}
	}

	fullScreen = () => {
		var elem = document.getElementById("document-content");
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen();
		}
	};

	render() {

		let {formats,chapter,name, pages, views, download, ownerFirstName, ownerLastName, ownerId, status, content, showReport, footerDocument,
			previewfile,ownerAvatar,type, seo_title, seo_description, pageHtml, pageLoadDone, classLevel, subject, tags,id,showLoginPopup} = this.state;
		let {slug} = this.props.match.params;
		let {AuthReducer, UserReducer} = this.props;
		let styles = {
			width: '100%',
			height: '500px',
		};

		return (
			<section className="container wrap__page wrap__detail">
				{showReport &&
					<ReportDocument
						docId={slug}
						closeReport={this.closeReport}
					/>
				}

				{showLoginPopup &&
				<LoginPopup
					docId={slug}
					closeLoginPopup={this.closeLoginPopup}
				/>
				}

				<Meta
					title={seo_title}
					description={seo_description}
					keywords={seo_description}
				/>

				<div className="wrap__right">
					<Breadcrumb
						classLevel={classLevel.name}
						subject={subject.name}
						classSlug={classLevel.slug}
						subjectSlug={subject.slug}
						classId={classLevel.id}
						subjectId={subject.id}
					/>
					<div className="document-detail">

						{(status === 'disable') &&
							<Alert bsStyle="danger">
								<div className="text-center">Tài liệu này đang chờ ban quản trị duyệt</div>
							</Alert>
						}
						<div className="detail_header">
							<div className="detail_left">
								<h1 className="wrap__title">{name}</h1>
								<div className="detail_user">
									<Link className="header-user" to={'/trang-ca-nhan/' + ownerId + '?onsort=all'}>
										<i className="fal fa-user"></i>
										{ownerFirstName} {ownerLastName}
									</Link>
									<div className="detail-price">
										<span className="price">Miễn phí</span>
										<span className="star"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fal fa-star"></i></span>
									</div>
									<button className="zoom" onClick={this.fullScreen}><i className="far fa-search-plus"></i></button>
								</div>
								<div className="detail_tyle">
									<div>
										<strong>Môn: </strong>
										<Link to={'/'+subject.slug+'/d0s'+subject.id+'c0t0'}>{subject.name}</Link>
									</div>
									<div>
										<strong>Lớp: </strong>
										<Link to={'/'+classLevel.slug+'/d0s0c'+classLevel.id+'t0'}>{classLevel.name}</Link>
									</div>
								</div>
							</div>
							<div className="detail_right">
								<button className="document-button btn vj-btn" onClick={() => this.clickToDownload(slug)}>
									<span className="document-download-text text-uppercase">Tải xuống ({download})</span>
									<i className="fal fa-download"></i>
								</button>
								<div className="document-report">
									<a href="javascript:void(0)" onClick={this.reportDocument}>Báo tài liệu vi phạm</a>
								</div>
								<div className="document-info">
									<div className="document-info-page"><i className="fal fa-file-alt"></i> {pages}</div>
									<div className="document-info-view"><i className="fal fa-eye"></i> {views}</div>
									<div className="document-info-download"><i className="fal fa-download"></i> {download}</div>
								</div>
							</div>
						</div>
						<div className="document-detail-content" id="document-content">
							{pageLoadDone ? (
								<Fragment>
									{previewfile!=='' ?
										(
											<Fragment>
												{formats=='pdf'?(
													<iframe style={styles} src={process.env.REACT_APP_BASE_URL+previewfile+"#toolbar=0"}></iframe>
												):(
													<iframe style={styles} src={"https://docs.google.com/viewer?url="+process.env.REACT_APP_BASE_URL+previewfile+"&embedded=true"}></iframe>
												)}
												<div className="document-middle-ads">
													<img src="/lib/images/document-ads.jpg" alt="" className="img-responsive"/>
												</div>
											</Fragment>
										):(
											<Fragment>
											{_.map(pageHtml, (page, i) => {
													return (
													<Fragment key={i}>
													<div className="document-detail-content-item" >
														{ReactHtmlParser(page)}
													</div>

													{(i !== (pageHtml.length - 1)) &&
													<div className="document-middle-ads">
														<img src="/lib/images/document-ads.jpg" alt="" className="img-responsive"/>
													</div>
													}
													</Fragment>

													)
												})}
											</Fragment>
										)
									}
								</Fragment>
							) : (
								<div className="document-detail-content-loading">
									<Loading/>
								</div>
							)}
						</div>

						<div className="document-detail-download-button">
							<button onClick={() => this.clickToDownload(slug)} className="btn vj-btn"><i className="fal fa-download"></i> Tải xuống ( {pages} trang )</button>
						</div>

						{/*<Related*/}
							{/*tags={this.props.tags}*/}
							{/*currentDocId={this.props.currentDocId}*/}
						{/*/>*/}
						{/*<List*/}
							{/*title={'Tài liệu liên quan'}*/}
							{/*itemClass={'col-xs-6 col-md-3 col-lg-3'}*/}
							{/*classLevel={classLevel.id}*/}
							{/*//user={ownerId}*/}
							{/*//currentId={slug}*/}
							{/*match={this.props.match}*/}
						{/*/>*/}

						<List
							title={'Tài liệu '+classLevel.name+' nổi bật'}
							itemClass={'col-xs-6 col-md-3 col-lg-3'}
							classLevel={classLevel.id}
							linkto={'/'+classLevel.slug+'/d0s0c'+classLevel.id+'t0'}
							//user={ownerId}
							//currentId={slug}
							match={this.props.match}
							showmore={true}
						/>

						<List
							title={'Tài liệu '+subject.name+' nổi bật'}
							itemClass={'col-xs-6 col-md-3 col-lg-3'}
							subject={subject.id}
							linkto={'/'+subject.slug+'/d0s'+subject.id+'c0t0'}
							//user={ownerId}
							//currentId={slug}
							match={this.props.match}
							showmore={true}
						/>

						<List
							title={'Tài liệu cùng tác giả'}
							itemClass={'col-xs-6 col-md-3 col-lg-3'}
							user={ownerId}
							currentId={slug}
							match={this.props.match}
							showmore={false}
						/>
						
						<Infomation
							content={content}
						/>

						<Tags
							tags={tags}
						/>

						{/*<FacebookComment/>*/}
						<Comment
							doc_id={id}
							requiredLogin={this.commentfeedback}
						/>

					</div>
				</div>
				<Sidebar
					tags={tags}
					currentDocId={slug}
					currentDoctype={type}
					currentSubject={subject.id}
					currentClass={classLevel.id}
					chapter={chapter}
					history={this.props.history}
				/>

				{footerDocument &&
					<div className="document-footer">
						<div className="container">
							<div className="document-button" onClick={() => this.clickToDownload(slug)}>
								<div className="document-download-top-button">
									<span className="document-download-text text-uppercase">Tải xuống</span>
									<span className="document-download-count">{download}</span>
								</div>
							</div>
						</div>
					</div>
				}
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (Document);