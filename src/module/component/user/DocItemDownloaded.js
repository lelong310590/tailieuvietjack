import React, {Component, Fragment} from 'react';
import * as helper from './../../Support';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'
import DocumentTag from "../support/DocumentTag"; // Import css
import {Link} from 'react-router-dom';
import _ from 'lodash';

class DocItemDownloaded extends Component {

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
					<Link to={'/tai-lieu/' + this.props.id + '-' + this.props.slug}>
						<img src={this.props.thumbnail ? this.props.thumbnail : '/lib/images/thumbnail.jpg'} alt="" className="img-responsive center-block"/>
					</Link>
				</div>
				<div className="doc-item-horizontal-info">
					<h4><Link to={'/tai-lieu/' + this.props.id + '-' + this.props.slug}>{this.props.name}</Link></h4>
					<div className="document-category-info">
						{!_.isEmpty(this.props.get_class) &&
							<Link to={'/'+this.props.get_class.slug+'/d0s0c'+this.props.get_class.id+'t0'} className="document-category-class">
								{this.props.get_class.name}
							</Link>
						}

						{!_.isEmpty(this.props.get_subject) &&
							<Link to={'/'+this.props.get_subject.slug+'/d0s'+this.props.get_subject.id+'c0t0'} className="document-category-subject">
								{this.props.get_subject.name}
							</Link>
						}

					</div>
					<div className="document-info">
						<div className="document-info-page"><i className="far fa-file-alt"></i> {this.props.pages}</div>
						<div className="document-info-view"><i className="far fa-eye"></i> {this.props.views}</div>
						<div className="document-info-download"><i className="fas fa-file-download"></i> {this.props.downloaded}</div>
						<div className="document-info-price">{helper.convertPrice(this.props.price)}</div>
					</div>
				</div>

			</div>
		);
	}
}

export default DocItemDownloaded;