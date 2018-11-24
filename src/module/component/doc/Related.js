import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import axios from 'axios';
import * as api from './../../const/Api';
import Loading from "../support/Loading";

class Related extends Component {

	constructor(props) {
		super(props);
		this.state = {
			docs: [],
			currentDocId: 0,
			onLoading: true
		}
	}

	componentDidMount = () => {
		this.setState({
			tags: this.props.tags
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.tags !== nextProps.tags) {
			this.setState({onLoading: true});

			let {tags, currentDocId} = nextProps;

			axios.get(api.API_GET_RELATED_DOC, {
				params: {
					tags, currentDocId
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
	};

	render() {
		let {docs, onLoading} = this.state;

		let docsElem = _.map(docs, (value, index) => (
			<div className="related-item" key={index}>
				<div className="related-item-title">
					<Link to={'/tai-lieu/' + value.id}>{value.name}</Link>
				</div>
				<div className="document-info">
					<div className="document-info-page"><i className="far fa-file-alt"></i> {value.pages}</div>
					<div className="document-info-view"><i className="far fa-eye"></i> {value.views}</div>
					<div className="document-info-download"><i className="fas fa-file-download"></i> {value.downloaded}</div>
				</div>
			</div>
		));

		return (
			<div className="related">
				<div className="related-title">
					<h4>GỢI Ý TÀI LIỆU LIÊN QUAN CHO BẠN</h4>
				</div>
				<div className="widget-content">

					{onLoading ? (
						<Loading/>
					) : (
						<div className="related-wrapper">
							{docsElem}
						</div>
					)}

				</div>
			</div>
		);
	}
}

export default Related;