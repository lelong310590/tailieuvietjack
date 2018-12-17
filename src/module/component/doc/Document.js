import React, {Component, Fragment} from 'react';
import List from "../listDoc/List";
import Infomation from "./Infomation";
import Tags from "./Tags";
import FacebookComment from "./FacebookComment";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./Sidebar";
import _ from 'lodash';
import * as api from './../../const/Api';
import axios from 'axios';
import Meta from "../support/Meta";
import ReactHtmlParser from 'react-html-parser';
import Loading from "../support/Loading";
import {Alert} from 'react-bootstrap';

class Document extends Component {

	constructor(props) {
		super(props);
		this.state = {
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
			tags: [],

			pageLoadDone: false
		}
	}

	componentDidMount = () => {
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
		let {status} = this.state;
		if (status === 'active') {
			this.props.history.push('/tai-lieu/download/' + slug);
		}
	};

	render() {

		let {name, pages, views, download, ownerFirstName, ownerLastName, ownerId, status,
			ownerAvatar, seo_title, seo_description, pageHtml, pageLoadDone, classLevel, subject, tags} = this.state;

		let {slug} = this.props.match.params;

		return (
			<section className="document-wrapper">

				<Meta
					title={seo_title}
					description={seo_description}
					keywords={seo_description}
				/>

				<div className="container">
					<Breadcrumb
						classLevel={classLevel.name}
						subject={subject.name}
						classSlug={classLevel.slug}
						subjectSlug={subject.slug}
					/>

					<div className="row">
						<div className="col-xs-12 col-md-9 document-detail">

							{(status === 'disable') &&
								<Alert bsStyle="danger text-center">
									<strong>Tài liệu này đang chờ ban quản trị duyệt</strong>
								</Alert>
							}

							<h1 className="document-detail-title">{name}</h1>
							<div className="document-info">
								<div className="document-info-page"><i className="far fa-file-alt"></i> {pages}</div>
								<div className="document-info-view"><i className="far fa-eye"></i> {views}</div>
								<div className="document-info-download"><i className="fas fa-file-download"></i> {download}</div>
							</div>

							<div className="document-stats">
								<div className="document-user">
									<div className="header-user">
										<img src={ownerAvatar ? ownerAvatar : '/lib/images/user_small.png'} alt="" className="img-responsive user-avatar"/>
										<p className="header-user-name">{ownerFirstName} {ownerLastName}</p>
									</div>
									<div className="document-report">
										<button>Báo tài liệu vi phạm</button>
									</div>
								</div>

								<div className="document-button" onClick={() => this.clickToDownload(slug)}>
									<div className="document-download-top-button">
										<span className="document-download-text text-uppercase">Tải xuống</span>
										<span className="document-download-count">{download}</span>
									</div>
								</div>
							</div>

							<div className="document-detail-content">
								{pageLoadDone ? (
									<Fragment>
										{_.map(pageHtml, (page, i) => {
											return (
												<div className="document-detail-content-item" key={i}>
													{ReactHtmlParser(page)}
												</div>
											)
										})}
									</Fragment>
								) : (
									<div className="document-detail-content-loading">
										<Loading/>
									</div>
								)}

							</div>

							<div className="document-detail-download-button">
								<button onClick={() => this.clickToDownload(slug)}><i className="fas fa-file-download"></i> Tải xuống ( {pages} trang )</button>
							</div>

							<List
								title={'Tài liệu cùng tác giả'}
								itemClass={'col-xs-6 col-md-3 col-lg-3'}
								user={ownerId}
								currentId={slug}
							/>

							<Infomation
								excerpt={seo_description}
							/>

							<Tags
								tags={tags}
							/>

							<FacebookComment/>
						</div>

						<Sidebar
							tags={tags}
							currentDocId={slug}
						/>
					</div>
				</div>
			</section>
		);
	}
}

export default Document;