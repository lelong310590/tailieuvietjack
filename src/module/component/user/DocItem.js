import React, {Component} from 'react';
import * as helper from './../../Support';

class DocItem extends Component {

	render() {
		return (
			<div className="doc-item-horizontal">
				<div className="doc-item-horizontal-image">
					<img src={this.props.thumbnail ? this.props.thumbnail : '/lib/images/thumbnail.jpg'} alt="" className="img-responsive center-block"/>
				</div>
				<div className="doc-item-horizontal-info">
					<h4>{this.props.name}</h4>
					<div className="document-info">
						<div className="document-info-page"><i className="far fa-file-alt"></i> {this.props.pages}</div>
						<div className="document-info-view"><i className="far fa-eye"></i> {this.props.views}</div>
						<div className="document-info-download"><i className="fas fa-file-download"></i> {this.props.downloaded}</div>
						<div className="document-info-price">{helper.convertPrice(this.props.price)}</div>
					</div>
				</div>
				<div className="doc-item-horizontal-action">
					<div className="doc-item-horizontal-date">
						<span>Ngày tải lên: {this.props.createdAt}</span>
					</div>
					<div className="doc-item-horizontal-action-button">
						<button><i className="far fa-trash-alt"></i> Xóa</button>
						<button><i className="far fa-edit"></i> Sửa</button>
					</div>
				</div>
			</div>
		);
	}
}

export default DocItem;