import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import _ from 'lodash';
import FilterList from "./FilterList";
import axios from 'axios';
import * as api from './../../const/Api';
import Loading from "../support/Loading";
import DocumentTag from "../support/DocumentTag";

class List extends Component {

	constructor(props) {
		super(props);

		this.state = {
			items: [],
			itemClass: this.props.itemClass,
			title: this.props.title,
			filterBar: this.props.filterBar,
			//option
			classLevel: this.props.classLevel,
			onLoading: true,
			getRelated: {
				tags: [],
				currentId: 0
			}
		}
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		// console.log('props: ', this.props.getRelated);
		// console.log('nextProps: ', nextProps.getRelated);

		if (this.props.getRelated !== nextProps.getRelated) {
			let {classLevel, user, week, getRelated,subject} = nextProps;
			this.fetchData(classLevel, user, week, getRelated,subject);
		}

		if (this.props.classLevel !== nextProps.classLevel) {
			let {classLevel, user, week, getRelated,subject} = nextProps;
			this.fetchData(classLevel, user, week, getRelated,subject);
            this.setState({
                title: nextProps.title,
            })
		}
        if (this.props.subject !== nextProps.subject) {
            let {classLevel, user, week, getRelated,subject} = nextProps;
            this.fetchData(classLevel, user, week, getRelated,subject);
            this.setState({
                title: nextProps.title,
            })
        }
		if (this.props.user !== nextProps.user) {
			let {classLevel, user, week, getRelated,subject} = nextProps;
			this.fetchData(classLevel, user, week, getRelated,subject);
		}
		return true;
	};

	componentDidMount() {
		let {classLevel, user, week, getRelated,subject} = this.props;
		this.fetchData(classLevel, user, week, getRelated,subject);
	}

	fetchData = (classLevel, user, week, getRelated,subject) => {

		let apiUrl = api.API_GET_LIST_DOC_BY_CAT;
		let defaultParams = {
            subject,
			classLevel,
			user,
			week
		};

		if (_.has(getRelated, 'tags')) {
			if (!_.isEmpty(getRelated.tags)) {
				apiUrl = api.API_GET_RELATED_DOC;
				defaultParams = getRelated
			}
		}

		axios.get(apiUrl, {
			params: defaultParams
		})
			.then(response => {
				this.setState({
					items: response.data
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
	};

	render() {
		let {items, itemClass, title, filterBar, onLoading} = this.state;

		let documents = _.map(items, (value, index) => {
			return (
				<div className={itemClass} key={index} className="document-items">
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
		});

		return (
			<div className="document-list">
				{onLoading ? (
					<Loading/>
				) : (
					<Fragment>
						{title &&
							<h4 className="wrap__title">{title}</h4>
						}
						{filterBar &&
						<FilterList/>
						}
						<div className="document-list-wrapper">
							{documents}
						</div>
                        {this.props.showmore && (
                            <div className="document-view-more text-center">
                                <Link className="btn vj-btn" to={this.props.linkto}>
                                    Xem thêm <i className="fal fa-angle-right"></i>
                                </Link>
                            </div>
                        )}
					</Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (List);
