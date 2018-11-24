import React, {Component} from 'react';
import axios from "axios";
import * as api from "../../const/Api";
import Meta from "../support/Meta";
import Countdown from 'react-countdown-now';
import { FacebookProvider, Like } from 'react-facebook';
import List from "../listDoc/List";

class Download extends Component {

	constructor(props) {
		super(props);
		this.state = {
			slug: this.props.match.params,
			name: '',
			pages: 0,
			views: 0,
			download: 0,
			ownerFirstName: '',
			ownerLastName: '',
			ownerId: 0,
			seo_title: '',
			seo_description: '',
			tags: [],
			fileSize: 0,
			formats: '',

			pageLoadDone: false
		}
	}

	componentDidMount = () => {
		let {slug} = this.props.match.params;
		this.fetchData(slug);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.match.params.slug !== nextProps.match.params.slug) {
			this.setState({pageLoadDone: false});
			let {slug} = nextProps.match.params;
			this.fetchData(slug);
		}
		return true;
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
					ownerFirstName: response.data.get_member.first_name,
					ownerLastName: response.data.get_member.last_name,
					ownerId: response.data.get_member.id,
					seo_title: response.data.name,
					seo_description: response.data.excerpt,
					tags: response.data.get_tags,
					fileSize: response.data.fileSize,
					formats: response.data.formats
				})
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				this.setState({pageLoadDone: true})
			})
	};

	render() {
		let {name, pages, views, download, ownerFirstName, ownerLastName, ownerId, formats,
			seo_title, seo_description, pageLoadDone, tags, fileSize} = this.state;

		// Renderer callback with condition
		const renderer = ({ hours, minutes, seconds, completed }) => {
			if (completed) {
				return (
					<div className="document-download-button">
						<button>Tải xuống</button>
						<span className="document-download-file-type text-uppercase">{formats}</span>
						<span>({fileSize} KB)</span>
					</div>
				);
			} else {
				// Render a countdown
				return (
					<div className="document-download-countdown">
						<p>Nút tải xuống sẽ hiển thị sau
							<span className="time"> {seconds}</span> s
						</p>
					</div>
				);
			}
		};

		let {slug} = this.props.match.params;

		return (
			<div className="box-download">
				<Meta
					title={seo_title}
					description={seo_description}
					keywords={seo_description}
				/>
				<div className="container">
					<div className="box-download-inner">
						<div className="row">
							<div className="box-for-ads col-xs-12 col-md-4">

							</div>

							<div className="box-download-content col-xs-12 col-md-8 document-detail">
								<h1 className="document-detail-title">{name}</h1>
								<div className="document-info">
									<div className="document-info-page"><i className="far fa-file-alt"></i> {pages}</div>
									<div className="document-info-view"><i className="far fa-eye"></i> {views}</div>
									<div className="document-info-download"><i className="fas fa-file-download"></i> {download}</div>
								</div>
								<div className="document-info-author">
									<p>{ownerFirstName} {ownerLastName}</p>
								</div>

								<Countdown
									date={Date.now() + 10000}
									renderer={renderer}
								/>

								<div className="box-download-social-button">
									<FacebookProvider appId="185415292298335">
										<Like href={window.location.href} colorScheme="dark" showFaces={false} share />
									</FacebookProvider>
								</div>

							</div>
						</div>
					</div>

					<div className="box-related-download">
						<List
							title={'Tài liệu thường được tải thêm'}
							itemClass={'col-xs-6 col-md-2 col-lg-2'}
							getRelated={
								{
									tags: tags,
									currentDocId: slug
								}
							}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Download;