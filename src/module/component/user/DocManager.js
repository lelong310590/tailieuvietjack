import React, {Component} from 'react';
import UserCover from "./UserCover";
import Menu from "./Menu";
import queryString from 'query-string';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import DocItem from "./DocItem";
import Pagination from "./Pagination";

class DocManager extends Component {

	constructor(props) {
		super(props);
		this.state = {
			filter: 'active',
			page: 1,
			url: this.props.location.pathname,
		}
	}

	componentDidMount = () => {
		const search = this.props.location.search;
		let token = localStorage.getItem('accessToken');
		let userId = localStorage.getItem('userId');
		let value = queryString.parse(search);
		let {page} = this.state;

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

		this.props.getUserDocument(userId, value.onsort, token, page);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props !== nextProps) {
			const search = nextProps.location.search;
			let value = queryString.parse(search);
			this.setState({
				filter: value.onsort
			});
		}

		return this.props === nextProps;
	};

	handleChangeFilter = (event) => {
		let filter = event.target.value;
		this.setState({filter});
		let url = this.props.match.url;
		this.props.history.push(url + '?onsort=' + filter);

		let token = localStorage.getItem('accessToken');
		let userId = this.props.UserReducer.id;
		this.props.getUserDocument(userId, filter, token, 1);
	};

	clickPage = (onsort, page) => {
		let token = localStorage.getItem('accessToken');
		let userId = this.props.UserReducer.id;
		this.props.getUserDocument(userId, onsort, token, page);
	};

	render() {

		let {filter} = this.state;
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

										<div className="document-filter-search">
											<div className="form-group">
												<input type="text" className="form-control" placeholder="Tìm kiếm..."/>
												<button type="button"><i className="fas fa-search"></i></button>
											</div>
										</div>
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
												url={this.state.url}
												onsort={this.state.filter}
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
		getUserDocument: (userId, filter, token, page) => {
			dispatch(actions.getUserDocument(userId, filter, token, page))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (DocManager);