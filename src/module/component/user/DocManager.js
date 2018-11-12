import React, {Component} from 'react';
import UserCover from "./UserCover";
import Menu from "./Menu";
import queryString from 'query-string';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import DocItem from "./DocItem";
import Pagination from "./Pagination";
import DocSearch from "./DocSearch";

class DocManager extends Component {

	constructor(props) {
		super(props);
		this.state = {
			filter: 'active',
			page: 1,
			url: this.props.location.pathname,
			keyword: ''
		}
	}

	componentDidMount = () => {
		const search = this.props.location.search;
		let token = localStorage.getItem('accessToken');
		let userId = localStorage.getItem('userId');
		let value = queryString.parse(search);
		let {page, keyword} = this.state;

		if (_.has(value, 'onsort')) {
			this.setState({
				filter: value.onsort,
			})
		} else { // set default url query
			this.setState({
				filter: 'active'
			})
		}

		if (_.has(value, 'page')) {
			this.setState({
				page: value.page
			})
		}

		if (_.has(value, 'keyword')) {
			this.setState({
				keyword: value.keyword
			})
		}

		this.props.getUserDocument(userId, value.onsort, token, value.page, value.keyword);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props !== nextProps) {
			let oldSearch = this.props.location.search;
			let oldValue = queryString.parse(oldSearch);

			let search = nextProps.location.search;
			let value = queryString.parse(search);
			this.setState({
				filter: value.onsort,
				keyword: value.keyword
			});

			if (value.keyword !== oldValue.keyword) {
				let token = localStorage.getItem('accessToken');
				let userId = localStorage.getItem('userId');
				this.props.getUserDocument(userId, value.onsort, token, 1, value.keyword);
			}

			if (value.page !== oldValue.page) {
				let token = localStorage.getItem('accessToken');
				let userId = localStorage.getItem('userId');
				this.props.getUserDocument(userId, value.onsort, token, value.page, value.keyword);
			}
		}

		return this.props === nextProps;
	};

	handleChangeFilter = (event) => {
		let filter = event.target.value;
		this.setState({filter});
		let url = this.props.match.url;
		this.props.history.push(url + '?onsort=' + filter);
	};

	clickPage = (onsort, page, keyword) => {
		let url = this.props.match.url;
		if (keyword !== undefined) {
			this.props.history.push(url + '?onsort=' + onsort + '&keyword=' + keyword + '&page=' + page);
		} else {
			this.props.history.push(url + '?onsort=' + onsort + '&page=' + page);
		}
	};

	search = (keyword) => {
		let {filter} = this.state;
		let {pathname} = this.props.location;
		this.props.history.push(pathname + '?onsort=' + filter + '&keyword=' + keyword);
	};

	render() {

		let {filter, keyword, url} = this.state;
		let {docs} = this.props.UserDocument;

		return (
			<section className="user-wrapper">
				<div className="user-cover-photo"></div>

				<div className="user-main-info">
					<div className="container">
						<UserCover/>
					</div>
				</div>

				<div className="user-main-wrapper">
					<div className="container">
						<div className="row">
							<Menu/>

							<div className="col-xs-12 col-md-9">
								<div className="user-main-setting-wrapper">
									<h1 className="user-main-setting-title"> Quản lý tài liệu</h1>
									<div className="document-manager-filter-bar">
										<div className="document-filter-radio">
											<div className="document-manager-filter-item">
												<label className="radio-inline">
													<input
														type="radio"
														name="optradio"
														value="active"
														onChange={this.handleChangeFilter}
														checked={filter === 'active'}
													/>Được duyệt (0)
												</label>
											</div>
											<div className="document-manager-filter-item">
												<label className="radio-inline">
													<input
														type="radio"
														name="optradio"
														value="disable"
														onChange={this.handleChangeFilter}
														checked={filter === 'disable'}
													/>Chờ duyệt (9)
												</label>
											</div>
										</div>

										<DocSearch
											search={this.search}
										/>
									</div>

									<div className="document-manager-list">
										<div className="document-manager-item">
											{_.map(docs.data, (d, i) => {
												return (
													<DocItem
														key={i}
														name={d.name}
														id={d.id}
														price={d.price}
														thumbnail={d.thumbnail}
														createdAt={d.created_at}
														pages={d.pages}
														views={d.views}
														downloaded={d.downloaded}
													/>
												)
											})}
										</div>

										{docs.last_page > 1 &&
											<Pagination
												url={url}
												onsort={filter}
												keyword={keyword}
												current_page={docs.current_page}
												first_page_url={docs.first_page_url}
												last_page={docs.last_page}
												last_page_url={docs.last_page_url}
												next_page_url={docs.next_page_url}
												prev_page_url={docs.prev_page_url}
												clickPage={this.clickPage}
											/>
										}
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
		getUserDocument: (userId, filter, token, page = 1, keywords = '',) => {
			dispatch(actions.getUserDocument(userId, filter, token, page, keywords))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (DocManager);