import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class List extends Component {

	constructor(props) {
		super(props);
		this.state = {
			items: [1,2,3,4,5,6,7,8,9,10,11,12]
		}
	}

	render() {
		let {items} = this.state;
		let documents = _.map(items, () => {
			return (
				<div className="col-xs-6 col-md-2">
					<div className="document-item">
						<Link to="" className="document-thumbnail">
							<img src="lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
						</Link>
						<Link to="" className="document-title">
							Bảng công thức tích phân - đạo hàm - Mũ - logarit
						</Link>
						<Link to="" className="document-author">
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
			<section className="document-list">
				<div className="container">
					<h4 className="document-list-title">Tài liệu nổi bật</h4>
					<div className="document-list-wrapper">
						<div className="row">
							{documents}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (List);