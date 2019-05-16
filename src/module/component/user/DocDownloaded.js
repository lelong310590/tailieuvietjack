import React, {Component, Fragment} from 'react';
import UserCover from "./UserCover";
import Menu from "./Menu";
import queryString from 'query-string';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import axios from 'axios';
import * as api from './../../const/Api';
import DocItemDownloaded from "./DocItemDownloaded";
import Pagination from "./Pagination";
import DocSearch from "./DocSearch";
import Loading from "../support/Loading";

class DocDownloaded extends Component {

	constructor(props) {
		super(props);
		this.state = {
			docs: [],
			onAction: false,
		}
	}

	componentDidMount = () => {
		axios.get(api.API_GET_DOWNLOADED_DOC, {
			params: {
				user: this.props.UserReducer.id
			}
		})
			.then(response => {
				this.setState({
					docs: response.data
				})
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				this.setState({
					onLoading: false
				})
			})
	};

	shouldComponentUpdate(nextProps, nextState) {
		if (this.props !== nextProps) {
			axios.get(api.API_GET_DOWNLOADED_DOC, {
				params: {
					user: this.props.UserReducer.id
				}
			})
				.then(response => {
					this.setState({
						docs: response.data
					})
				})
				.catch(err => {
					console.log(err)
				})
				.finally(() => {
					this.setState({
						onLoading: false
					})
				})
		}
		return true;
	}


	render() {

		let {docs, onAction} = this.state;

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
									<h1 className="user-main-setting-title"> Tài liệu đã tải</h1>


									<div className="document-manager-list">
										<div className="document-manager-item">
											<Fragment>
												{onAction &&
													<Loading/>
												}
											</Fragment>

											{_.map(docs, (d, i) => {
												return (
													<DocItemDownloaded
														key={i}
														name={d.name}
														id={d.id}
														slug={d.slug}
														price={d.price}
														thumbnail={d.thumbnail}
														createdAt={d.created_at}
														pages={d.pages}
														views={d.views}
														downloaded={d.downloaded}
														status={d.status}
														onAction={d.onactive}
														format={d.formats}
														get_class={d.get_class}
														get_subject={d.get_subject}
													/>
												)
											})}
										</div>


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


export default connect(mapStateToProps, null) (DocDownloaded);