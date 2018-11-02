import React, {Component} from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';

class Related extends Component {

	constructor(props) {
		super(props);
		this.state = {
			docs: [1,2,3,4,5,6,7,8,9,10,11,12]
		}
	}

	render() {

		let {docs} = this.state;

		let docsElem = _.map(docs, (value, index) => (
			<div className="related-item" key={index}>
				<div className="related-item-title">
					<Link to="/tai-lieu/45678">Bảng công thức tích phân đạo hàm mũ logarit</Link>
				</div>
				<div className="document-info">
					<div className="document-info-page"><i className="far fa-file-alt"></i> 2</div>
					<div className="document-info-view"><i className="far fa-eye"></i> 2045</div>
					<div className="document-info-download"><i className="fas fa-file-download"></i> 849</div>
				</div>
			</div>
		));

		return (
			<div className="related">
				<div className="related-title">
					<h4>GỢI Ý TÀI LIỆU LIÊN QUAN CHO BẠN</h4>
				</div>
				<div className="widget-content">
					<div className="related-wrapper">
						{docsElem}
					</div>
				</div>
			</div>
		);
	}
}

export default Related;