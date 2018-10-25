import React, {Component} from 'react';
import _ from "lodash";
import {Link} from "react-router-dom";

class TopWeekDoc extends Component {

	constructor(props) {
		super(props);
		this.state = {
			doc: [1,2,3,4,5,6,7]
		}
	}

	render() {

		let {doc} = this.state;

		let listWeekDocs = _.map(doc, (value, index) => {
			return (
				<Link to="/tai-lieu/23456" className="featured-document-item" key={index}>
					<div className="no-document-item">{value}</div>
					<div className="featured-document-info">
						<h4 className="featured-document-info-title">Chuyên đề đặc biệt về KHOẢNG CÁCH trong không gian</h4>
						<div className="document-info">
							<div className="document-info-page"><i className="far fa-file-alt"></i> 2</div>
							<div className="document-info-view"><i className="far fa-eye"></i> 2045</div>
							<div className="document-info-download"><i className="fas fa-file-download"></i> 849</div>
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
					<div className="featured-document-wrapper">
						{listWeekDocs}
					</div>
				</div>
			</div>
		);
	}
}

export default TopWeekDoc;