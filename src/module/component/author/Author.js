import React, {Component} from 'react';
import _ from "lodash";
import {Link} from "react-router-dom";
import DocumentTag from "../support/DocumentTag";
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import queryString from 'query-string';
import Pagination from "../user/Pagination";

class Author extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {
				first_name: '',
				last_name: '',
				thumbnail: '',
                total_views:0,
                total_downloaded:0
			},
			documents: {
				data: []
			},
			onsort: 'all',
			page: 1,
			url: this.props.location.pathname,
		}
	}

	componentDidMount = () => {
		let {userid} = this.props.match.params;
		const {search} = this.props.location;
		let value = queryString.parse(search);

		if (_.has(value, 'onsort')) {
			this.setState({
				onsort: value.onsort,
			})
		} else { // set default url query
			this.setState({
				onsort: 'all'
			})
		}

		if (_.has(value, 'page')) {
			this.setState({
				page: value.page
			})
		}

		this.props.getAuthor(userid, value.onsort, value.page);
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props !== nextProps) {
			let oldSearch = this.props.location.search;
			let oldValue = queryString.parse(oldSearch);

			let search = nextProps.location.search;
			let value = queryString.parse(search);

			let {userid} = this.props.match.params;

			this.setState({
				onsort: value.onsort,
			});

			if (value.page !== oldValue.page) {
				this.props.getAuthor(userid, value.onsort, value.page);
			}

			if (value.onsort !== oldValue.onsort) {
				this.props.getAuthor(userid, value.onsort);
			}
		}

		if (this.props.AuthorReducer !== nextProps.AuthorReducer) {
			this.setState({
				user: nextProps.AuthorReducer.user,
				documents: nextProps.AuthorReducer.documents
			});
		}

		return true;
	};

	handleChangeFilter = (filter) => {
		this.setState({filter});
		let url = this.props.match.url;
		this.props.history.push(url + '?onsort=' + filter);
	};

	clickPage = (onsort, page) => {
		let url = this.props.match.url;
		this.props.history.push(url + '?onsort=' + onsort + '&page=' + page);
	};

	render() {

		let {user, documents, onsort, url} = this.state;

		return (
			<div className='author-document'>
				<div className="user-cover-photo"></div>
				<div className="author-status-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-9 col-md-push-3 author-status-button">
								<span className={onsort === 'all' ? 'active' : ''} onClick={() => this.handleChangeFilter('all')}>Tất cả</span>
								<span className={onsort === 'free' ? 'active' : ''} onClick={() => this.handleChangeFilter('free')}>Miễn phí</span>
								<span className={onsort === 'paid' ? 'active' : ''} onClick={() => this.handleChangeFilter('paid')}>Trả phí</span>
							</div>
						</div>
					</div>
				</div>

				<div className="author-document-wrapper">
					<div className="container">
						<div className="row">
							<div className="author-document-user col-xs-12 col-md-3">
								<div className="author-document-user-avatar">
									<img src={user.thumbnail? user.thumbnail : '/lib/images/user_small.png'} alt={user.first_name + ' ' + user.last_name} className="img-responsive"/>
								</div>

								<div className="author-document-name">
									<h4>{user.first_name} {user.last_name}</h4>
								</div>
								<div className="author-total-information">
									<div className="author-total-stats text-center">
										<span>LƯỢT XEM</span>
										<b>{user.total_views}</b>
									</div>
									<div className="author-total-stats text-center">
										<span>TÀI LIỆU</span>
										<b>{documents.total}</b>
									</div>
									<div className="author-total-stats text-center">
										<span>LƯỢT TẢI</span>
										<b>{user.total_downloaded}</b>
									</div>
								</div>
							</div>

							<div className="author-document-list col-xs-12 col-md-9">
								<div className="document-list-wrapper">
									{_.map(documents.data, (value, idx) => {
										return (
											<div className="document-items" key={idx}>
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
												</div>
												<div className="document-info">
													<div className="document-info-page"><i className="fal fa-file-alt"></i> {value.pages}</div>
													<div className="document-info-view"><i className="fal fa-eye"></i> {value.views}</div>
													<div className="document-info-download"><i className="fal fa-download"></i> {value.downloaded}</div>
												</div>
											</div>
										)
									})}
								</div>

								{documents.last_page > 1 &&
									<Pagination
										url={url}
										onsort={onsort}
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
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getAuthor: (id, onsort, page = 1) => {
			dispatch(actions.getAuthor(id, onsort, page))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (Author);