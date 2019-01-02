import React, {Component} from 'react';

class ListDocuments extends Component {

	constructor(props) {
		super(props);
		this.state = {
			viewStyle: 'list'
		}
	}


	render() {
		return (
			<div className="category-document-wrapper">
				<div className="category-document-filter">
					<div className="category-document-filter-order">
						<div className="category-document-filter-order-item">
							<span>Mới nhất</span>
						</div>
						<div className="category-document-filter-order-item">
							<span>Được quan tâm nhất</span>
						</div>
					</div>
					<div className="category-document-filter-view">
						<div className="category-document-filter-view-item">
							<i className="fas fa-th-list"></i>
						</div>
						<div className="category-document-filter-view-item">
							<i className="fas fa-th-large"></i>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ListDocuments;