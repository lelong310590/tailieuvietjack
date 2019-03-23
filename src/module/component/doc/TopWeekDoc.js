import React, {Component} from 'react';
import _ from "lodash";
import {Link} from "react-router-dom";
import axios from 'axios';
import * as api from './../../const/Api';
import Loading from "../support/Loading";
import DocumentTag from "../support/DocumentTag";

class TopWeekDoc extends Component {

	constructor(props) {
		super(props);
		this.state = {
			doc: [],
			onLoading: true
		}
	}

	componentDidMount = () => {
		axios.get(api.API_GET_MOST_VIEW_BY_WEEK, {
			params: {
				week: true
			}
		})
			.then(response => {
				this.setState({
					doc: response.data
				})
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				this.setState({onLoading: false})
			})
	};

	render() {

		let {doc,onLoading} = this.state;

		let listWeekDocs = _.map(doc, (value, index) => {
			return (
				<div className="featured-document-item" key={index}>
					<Link className="featured-document-title" to={'/tai-lieu/' + value.id + '-' + value.slug} title={value.name}>
						<span className="no-document">{index + 1}.</span>
						<DocumentTag
							format={value.formats}
						/>
						{value.name}
					</Link>
					<div className="document-info">
						<div className="document-info-page"><i className="fal fa-file-alt"></i> {value.pages}</div>
						<div className="document-info-view"><i className="fal fa-eye"></i> {value.views}</div>
						<div className="document-info-download"><i className="fal fa-download"></i> {value.downloaded}</div>
					</div>
				</div>
			)
		})

		return (
			<div className="vj-widgets">
				<h4>Top tài liệu tuần</h4>
				<div className="widget-content">
					{onLoading ? (
						<Loading/>
					) : (
						<div className="featured-document-wrapper">
							{listWeekDocs}
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default TopWeekDoc;