import React, {Component} from 'react';
import _ from "lodash";
import { Link } from "react-router-dom";
import DocumentTag from "../support/DocumentTag";

class ListDocuments extends Component {

	constructor(props) {
		super(props);
		this.state = {
			viewStyle: 'grid'
		}
	}

	handleChangeViewStyle = (viewStyle) => {
		this.setState({ viewStyle })
	};

	render() {
		const { items } = this.props;
		const { viewStyle } = this.state;
		return (
			<div className="category-document-wrapper">
				<div className="category-document-filter" style={{ marginBottom: "10px" }}>
					<div className="category-document-filter-order">
						<div className="category-document-filter-order-item">
							<span>Mới nhất</span>
						</div>
						<div className="category-document-filter-order-item">
							<span>Được quan tâm nhất</span>
						</div>
					</div>
					<div className="category-document-filter-view">
						<div className="category-document-filter-view-item"
							 onClick={() => this.handleChangeViewStyle('list')}
						>
							<i className="fas fa-th-list" style={{ color: viewStyle === 'list' ? '#ff9700': null }}></i>
						</div>
						<div className="category-document-filter-view-item"
							 onClick={() => this.handleChangeViewStyle('grid')}>
							<i className="fas fa-th-large" style={{ color: viewStyle === 'grid' ? '#ff9700': null }}></i>
						</div>
					</div>
				</div>
				<div className="row">
					{
						_.map(items, (value, index) => {
							const className = `document-item`;
							return (
								<div key={index} className={viewStyle === 'list' ? 'col-xs-12' : 'col-xs-6 col-md-3 col-lg-3'}>
									<div className={className}>
										<Link to={'/tai-lieu/' + value.id} className="document-thumbnail">
											<DocumentTag
												format={value.formats}
											/>

											{value.thumbnail !== null ? (
												<img src={value.thumbnail} alt=""
													 className="img-responsive center-block"/>
											) : (
												<img src="/lib/images/thumbnail.jpg" alt=""
													 className="img-responsive center-block"/>
											)}
										</Link>
										<Link to={'/tai-lieu/' + value.id} className="document-title">
											{value.name}
										</Link>
										<div className="document-price">
											{value.formated_price}
										</div>
										<Link to={'/tai-lieu/' + value.id} className="document-author">
											{/*{value.get_member.first_name} {value.get_member.last_name}*/}
										</Link>
										<div className="document-info">
											<div className="document-info-page">
												<i className="far fa-file-alt"></i> {value.pages}
											</div>
											<div className="document-info-view">
												<i className="far fa-eye"></i> {value.views}
											</div>
											<div className="document-info-download">
												<i className="fas fa-file-download"></i> {value.downloaded}
											</div>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
}

export default ListDocuments;
