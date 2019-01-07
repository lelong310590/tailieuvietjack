import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
			let {classLevel, user, week, getRelated} = nextProps;
			this.fetchData(classLevel, user, week, getRelated);
		}

		return true;
	};

	componentDidMount() {
		let {classLevel, user, week, getRelated} = this.props;
		this.fetchData(classLevel, user, week, getRelated);
	}

	fetchData = (classLevel, user, week, getRelated) => {

		let apiUrl = api.API_GET_LIST_DOC_BY_CAT;
		let defaultParams = {
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
				<div className={itemClass} key={index}>
					<div className="document-item">
						<Link to={'/tai-lieu/' + value.id} className="document-thumbnail">

							<DocumentTag
								format={value.formats}
							/>

							{_.isEmpty(value.thumbnail) ? (
								<img src={value.thumbnail} alt="" className="img-responsive center-block"/>
							) : (
								<img src="/lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
							)}
						</Link>
						<Link to={'/tai-lieu/' + value.id} className="document-title">
							{value.name}
						</Link>
						<div className="document-price">
							{value.formated_price}
						</div>
						<Link to={'/tai-lieu/' + value.id} className="document-author">
							{value.get_member.first_name} {value.get_member.last_name}
						</Link>
						<div className="document-info">
							<div className="document-info-page"><i className="far fa-file-alt"></i> {value.pages}</div>
							<div className="document-info-view"><i className="far fa-eye"></i> {value.views}</div>
							<div className="document-info-download"><i className="fas fa-file-download"></i> {value.downloaded}</div>
						</div>
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
						<h4 className="document-list-title">{title}</h4>
						}

						{filterBar &&
						<FilterList/>
						}

						<div className="document-list-wrapper">
							<div className="row">
								{documents}
							</div>
						</div>
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