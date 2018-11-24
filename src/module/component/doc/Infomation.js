import React, {Component} from 'react';
import ReactHtmlParser from 'react-html-parser';

class Infomation extends Component {
	render() {
		return (
			<div className="document-detail-infomation">
				<h4>THÔNG TIN TÀI LIỆU</h4>
				<div className="document-detail-nfomation-content text-justify">
					{ReactHtmlParser(this.props.excerpt)}
				</div>
			</div>
		);
	}
}

export default Infomation;