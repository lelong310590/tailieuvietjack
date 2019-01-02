import React, {Component, Fragment} from 'react';
import Loading from "../support/Loading";
import {Link} from "react-router-dom";
import _ from 'lodash';

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
			<div className="document-list">
				{onLoading ? (
					<Loading/>
				) : (
					<Fragment>
						<h4 className="document-list-title">{title}</h4>

						<div className="document-list-wrapper">
							<div className="row">
								{_.map(documents, (value, index) => {
									return (
										<div className="col-xs-6 col-md-3 col-lg-3" key={index}>
											<div className="document-item">
												<Link to={'/tai-lieu/' + value.id} className="document-thumbnail">
													{_.isEmpty(value.thumbnail) ? (
														<img src="/lib/images/thumbnail.jpg" alt="" className="img-responsive center-block"/>
													) : (
														<img src={value.thumbnail} alt="" className="img-responsive center-block"/>
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
								})}
							</div>
						</div>
					</Fragment>
				)}
			</div>
		);
	}
}

export default HomeListDocument;