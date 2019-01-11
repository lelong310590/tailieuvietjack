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
			<div className="widget filter-box-wrapper">
				<div className="widget-title"><h4 className="text-center">Từ khóa nổi bật</h4></div>
				<div className="widget-content">
					<div className="featured-document-wrapper tag-cloud-wrapper">
						<TagClouds minSize={12}
						          maxSize={35}
						          tags={tags}
						          onClick={tag => {this.props.history.push('/tag/' + tag.slug)}} />
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
		getTagCloud: () => {
			dispatch(action.getTagCloud())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (TagCloud);