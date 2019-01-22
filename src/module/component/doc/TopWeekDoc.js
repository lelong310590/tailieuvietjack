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
				<Link to={'/tai-lieu/' + value.id + '-' + value.slug} className="featured-document-item" key={index}>
					<div className="no-document-item">{index + 1}</div>
					<div className="featured-document-info">
						<h4 className="featured-document-info-title">
							<DocumentTag
								format={value.formats}
							/>
							{value.name}
						</h4>
						<div className="document-info">
							<div className="document-info-page"><i className="far fa-file-alt"></i> {value.pages}</div>
							<div className="document-info-view"><i className="far fa-eye"></i> {value.views}</div>
							<div className="document-info-download"><i className="fas fa-file-download"></i> {value.downloaded}</div>
						</div>
					</div>
				</Link>
			)
		})

		return (
			<div className="widget">
				<div className="widget-title">
					<h4 className="text-center">TOP TÀI LIỆU TUẦN</h4>
				</div>
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