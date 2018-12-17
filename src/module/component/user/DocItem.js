import React, {Component, Fragment} from 'react';
import * as helper from './../../Support';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import DocumentTag from "../support/DocumentTag"; // Import css
import {Link} from 'react-router-dom';

class DocItem extends Component {

	deleteDoc = (mess) => {
		confirmAlert({
			title: '',
			message: mess,
			buttons: [
				{
					label: 'Đồng ý',
					onClick: () => this.props.deleteDoc(this.props.id)
				},
				{
					label: 'Quay lại',
					onClick: () => {}
				}
			]
		})
	};

	render() {
		return (
			<div className="doc-item-horizontal">
				<div className="doc-item-horizontal-image">
					<DocumentTag
						format={this.props.format}
					/>
					<Link to={'/tai-lieu/' + this.props.id}>
						<img src={this.props.thumbnail ? this.props.thumbnail : '/lib/images/thumbnail.jpg'} alt="" className="img-responsive center-block"/>
					</Link>
				</div>
				<div className="doc-item-horizontal-info">
					<h4><Link to={'/tai-lieu/' + this.props.id}>{this.props.name}</Link></h4>
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
						{this.props.status === 'active' &&
							<button onClick={() => this.deleteDoc('Bạn muốn xóa ngưng xuất bản tài liệu đã chọn')}>
								<i className="fas fa-angle-double-down"></i> Ngưng xuất bản
							</button>
						}

						{this.props.status === 'disable' &&
							<Fragment>
								<Link to={'/tai-lieu/sua-tai-lieu/' + this.props.id} exact="true"><i className="far fa-edit"></i> Sửa</Link>
								<button onClick={() => this.deleteDoc('Bạn muốn xóa tài liệu đã chọn')}>
									<i className="far fa-trash-alt"></i> Xóa
								</button>
							</Fragment>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default DocItem;