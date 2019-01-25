import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import DocumentTag from "../support/DocumentTag";
import _ from 'lodash';
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class SpecialDocument extends Component {

	constructor(props) {
		super(props);
		this.state = {
			documents: [],
		}
	}

	componentDidMount = () => {
		this.props.getMostView();
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.ClassesReducer.featuredDoc !== nextProps.ClassesReducer.featuredDoc) {
			this.setState({
				documents: nextProps.ClassesReducer.featuredDoc
			})
		}

		return true;
	};

	render() {

		let {documents} = this.state;

		return (
			<div className="special-document">
				<h4 className="special-document-title">Tài liệu nổi bật</h4>
				<div className="special-document-wrapper">

					<OwlCarousel
						className="owl-theme"
						items={4}
						margin={10}
					>
						{_.map(documents, (value, index) => {
							return (
								<div className="item" key={index}>
									<div className="document-item">
										<Link to={'/tai-lieu/' + value.id + '-' + value.slug} className="document-thumbnail" title={value.name}>
											<DocumentTag
												format={value.formats}
											/>

											{value.thumbnail !== null ? (
												<img src={value.thumbnail} alt={value.name} className="img-responsive center-block"/>
											) : (
												<img src="/lib/images/thumbnail.jpg" alt={value.name} className="img-responsive center-block"/>
											)}
										</Link>
										<Link to={'/tai-lieu/' + value.id + '-' + value.slug} className="document-title" title={value.name}>
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
						})}
					</OwlCarousel>


				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getMostView: () => {
			dispatch(action.getMostView())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (SpecialDocument);