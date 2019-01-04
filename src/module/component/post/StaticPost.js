import React, {Component, Fragment} from 'react';
import SidebarPost from "./SidebarPost";
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import ReactHtmlParser from 'react-html-parser';

class StaticPost extends Component {

	constructor(props) {
		super(props);
		this.state = {
			post: {
				name: '',
				created_at: ''
			}
		}
	}

	componentDidMount =() => {
		let {slug} = this.props.match.params;
		this.props.getPost(slug)
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.match.params.slug !== nextProps.match.params.slug) {
			this.props.getPost(nextProps.match.params.slug)
		}

		if (this.props.PostReducer.post !== nextProps.PostReducer.post) {
			this.setState({
				post: nextProps.PostReducer.post
			})
		}

		return true;
	};

	render() {

		let {post} = this.state;

		return (
			<div className="static-post-wrapper">
				<div className="container">
					<div className="row">
						<SidebarPost/>

						<div className="static-post-content col-xs-12 col-md-9">
							{post !== '' &&
								<Fragment>
									<h1 className="static-post-title">{post.name}</h1>
									<span className="static-post-entry"><i className="far fa-clock"></i> {post.created_at}</span>
									<div className="static-post-content">
										{ReactHtmlParser(post.content)}
									</div>
								</Fragment>
							}
						</div>
					</div>
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
		getPost: (slug) => {
			dispatch(actions.getPost(slug))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (StaticPost);