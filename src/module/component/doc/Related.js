import React, {Component} from 'react';
import _ from 'lodash';
import {NavLink, Link} from 'react-router-dom';
import axios from 'axios';
import * as api from './../../const/Api';
import DocumentTag from "../support/DocumentTag";

class Related extends Component {

	constructor(props) {
		super(props);
		this.state = {
			docs: [],
			currentDocId: 0,
			onLoading: true
		}
	}

	componentDidMount = () => {
		this.setState({
			tags: this.props.tags
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.tags !== nextProps.tags) {
			this.setState({onLoading: true});

			let {tags, currentDocId} = nextProps;

			axios.get(api.API_GET_RELATED_DOC, {
				params: {
					tags, currentDocId
				}
			})
				.then(response => {
					this.setState({
						docs: response.data
					})
				})
				.catch(err => {
					console.log(err)
				})
				.finally(() => {
					this.setState({
						onLoading: false
					})
				})
		}

		return true;
	};

	render() {
		let {docs, onLoading} = this.state;

		let docsElem = _.map(docs, (value, index) => (
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
		));

		return (
			<div className="document-list">
				<h4 className="wrap__title">Tài liệu liên quan</h4>
				<div className="document-list-wrapper">
					{docsElem}
				</div>
			</div>
		);
	}
}

export default Related;