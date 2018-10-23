import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class List extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [1,2,3,4,5,6],
			itemClass: this.props.itemClass,
			title: this.props.title
		}
	}

	render() {
		let {items, itemClass, title} = this.state;

		let documents = _.map(items, (value, index) => {
			return (
				<div className={itemClass} key={value}>
					<div className="document-item">
						<Link to="/tai-lieu/123456" className="document-thumbnail">
							<img src="/lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
						</Link>
						<Link to="/tai-lieu/123456" className="document-title">
							Bảng công thức tích phân - đạo hàm - Mũ - logarit
						</Link>
						<Link to="/tai-lieu/123456" className="document-author">
							Trần Quang
						</Link>
						<div className="document-info">
							<div className="document-info-page"><i className="far fa-file-alt"></i> 2</div>
							<div className="document-info-view"><i className="far fa-eye"></i> 2045</div>
							<div className="document-info-download"><i className="fas fa-file-download"></i> 849</div>
						</div>
					</div>
				</div>
			)
		});

		return (
			<div className="document-list">
				<h4 className="document-list-title">{title}</h4>
				<div className="document-list-wrapper">
					<div className="row">
						{documents}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (List);