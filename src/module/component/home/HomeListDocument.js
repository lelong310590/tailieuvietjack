import React, {Component, Fragment} from 'react';
import Loading from "../support/Loading";
import {Link, NavLink} from "react-router-dom";
import _ from 'lodash';
import DocumentTag from "../support/DocumentTag";

class HomeListDocument extends Component {

	constructor(props) {
		super(props);
		this.state = {
			onLoading: true,
			title: '',
			documents: []
		}
	}

	componentDidMount = () => {
		this.setState({
			onLoading: false,
			title: this.props.title,
			documents: this.props.documents
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.documents !== nextProps.documents) {
			this.setState({
				documents: nextProps.documents
			})
		}

		return true;
	};

	render() {

		let {onLoading, title, documents} = this.state;

		return (
			<Fragment>
				{!_.isEmpty(documents) &&
					<div className="document-list">
						{onLoading ? (
							<Loading/>
						) : (
							<Fragment>
								<h4 className="wrap__title">{title}</h4>

								<div className="document-list-wrapper">
									{_.map(documents, (value, index) => {
										return (
											<div className="document-items" key={index}>
												<div className="document-img">
													<div className="document-link">
														<Link title={value.get_class.name} to={'/'+value.get_class.slug+'/d0s0c' + value.get_class.id+'t0'} className="btn vj-btn document-class">
															{value.get_class.name}
														</Link>
														<Link title={value.get_subject.name} to={'/'+value.get_subject.slug+'-'+value.get_class.slug+'/d0s' + value.get_subject.id+'c'+value.get_class.id+'t0'} className="btn document-subject">
															{value.get_subject.name}
														</Link>
													</div>
													<DocumentTag format={value.formats} />
													<Link to={'/tai-lieu/' + value.id + '-' + value.slug} className="document-thumbnail" title={value.name}>
														{_.isEmpty(value.thumbnail) ? (
															<img src="/lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
														) : (
															<img src={value.thumbnail} alt="" className="img-responsive center-block"/>
														)}
													</Link>
												</div>
												<div className="document-content">
													<Link to={'/tai-lieu/' + value.id + '-' + value.slug} className="document-title" title={value.name}>
														{value.name}
													</Link>
													<div className="document-price">
														<span className="price">{value.formated_price}</span>
														<span className="star"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fal fa-star"></i></span>
													</div>
													<NavLink
														to={{ pathname: '/trang-ca-nhan/'+ value.get_member.id, search: 'onsort=all'}}
														className="document-author"
														title={value.get_member.first_name + ' ' + value.get_member.last_name}
													>
														<i className="fal fa-user"></i> {value.get_member.first_name} {value.get_member.last_name}
													</NavLink>
												</div>
												<div className="document-info">
													<div className="document-info-page"><i className="fal fa-file-alt"></i> {value.pages}</div>
													<div className="document-info-view"><i className="fal fa-eye"></i> {value.views}</div>
													<div className="document-info-download"><i className="fal fa-download"></i> {value.downloaded}</div>
												</div>
											</div>
										)
									})}
								</div>
							</Fragment>
						)}
						<div className="document-view-more text-center">
							<Link className="btn vj-btn" to={this.props.slug}>
								Xem thêm <i className="fal fa-angle-right"></i>
							</Link>
						</div>
					</div>
				}
			</Fragment>
		);
	}
}

export default HomeListDocument;
