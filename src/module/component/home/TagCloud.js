import React, {Component} from 'react';
import { TagCloud as TagClouds } from "react-tagcloud";
import {connect} from 'react-redux';
import * as action from './../../action/Index';

class TagCloud extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tags: []
		}
	}

	componentDidMount = () => {
		this.props.getTagCloud();
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.TagCloudReducer.tags !== nextProps.TagCloudReducer.tags) {
			this.setState({
				tags: nextProps.TagCloudReducer.tags
			})
		}

		return true;
	};

	render() {

		let {tags} = this.state;

		return (
			<div className="vj-widgets">
				<h4>Từ khóa nổi bật</h4>
				<TagClouds minSize={14}
						          maxSize={32}
						          tags={tags}
						          onClick={tag => {this.props.history.push('/tag/' + tag.slug)}} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getTagCloud: () => {
			dispatch(action.getTagCloud())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (TagCloud);