import React, {Component, Fragment} from 'react';
import _ from "lodash";
import {Link, NavLink} from "react-router-dom";
import DocumentTag from "../support/DocumentTag";
import * as helper from "../../Support";
import SpecialDocument from "./SpecialDocument";

class ListDocuments extends Component {

	constructor(props) {
		super(props);
		this.state = {
			viewStyle: 'list'
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

				<SpecialDocument/>

				<div className="category-document-filter" style={{ marginBottom: "20px" }}>
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

				{(viewStyle === 'grid') ? (
					<div className="row">
						{
							_.map(items, (value, index) => {
								return (
									<div className="col-xs-6 col-md-3 col-lg-3" key={index}>
										<div className="document-item">
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
											<div className="document-category-info">
												<Link to={'/cat/' + value.get_class.slug} className="document-category-class">
													{value.get_class.name}
												</Link>
												<Link to={'/cat/' + value.get_class.slug + '/' + value.get_subject.slug} className="document-category-subject">
													{value.get_subject.name}
												</Link>
											</div>
											<NavLink
												to={{ pathname: '/trang-ca-nhan/'+ value.get_member.id, search: 'onsort=all'}}
												className="document-author"
												title={value.get_member.first_name + ' ' + value.get_member.last_name}
											>
												{value.get_member.first_name} {value.get_member.last_name}
											</NavLink>
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
				) : (
					<div className="tag-list-wrapper">
						{
							_.map(items, (value, index) => {
								return (
									<Fragment key={index}>
										<div className="doc-item-horizontal">
											<div className="doc-item-horizontal-image">
												<DocumentTag
													format={value.formats}
												/>
												<Link to={'/tai-lieu/' + value.id + '-' + value.slug} title={value.name}>
													<img src={value.thumbnail ? value.thumbnail : '/lib/images/thumbnail.jpg'} alt="" className="img-responsive center-block"/>
												</Link>
											</div>
											<div className="doc-item-horizontal-info">
												<div className="doc-item-horizontal-info-infomation">
													<h4><Link to={'/tai-lieu/' + value.id + '-' + value.slug} title={value.name}>{value.name}</Link></h4>
													<div className="document-category-info">
														<Link to={'/cat/' + value.get_class.slug} className="document-category-class">
															{value.get_class.name}
														</Link>
														<Link to={'/cat/' + value.get_class.slug + '/' + value.get_subject.slug} className="document-category-subject">
															{value.get_subject.name}
														</Link>
													</div>
													<div className="doc-item-horizontal-info-infomation-content">
														{value.excerpt}
													</div>
												</div>
												<div className="document-info">
													<div className="document-info-page"><i className="far fa-file-alt"></i> {value.pages}</div>
													<div className="document-info-view"><i className="far fa-eye"></i> {value.views}</div>
													<div className="document-info-download"><i className="fas fa-file-download"></i> {value.downloaded}</div>
													<div className="document-info-price">{helper.convertPrice(value.price)}</div>
												</div>
											</div>
										</div>

										{((index + 1) % 5 === 0) &&
											<div className="document-middle-ads">
												<img src="/lib/images/document-ads.jpg" alt="" className="img-responsive center-block"/>
											</div>
										}
									</Fragment>
								)
							})
						}
					</div>
				)}


			</div>
		);
	}
}

export default ListDocuments;
