import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class Tags extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tags: []
		}
	}

	componentDidMount = () => {
		this.setState({
			tags: this.props.tags
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.tags !== nextProps.tags) {
			this.setState({
				tags: nextProps.tags
			})
		}

		return true;
	};

	render() {

		let {tags} = this.state;

		return (
			<Fragment>
				{_.isEmpty(tags) ? (
					<Fragment></Fragment>
				) : (
					<div className="document-detail-tags">
						<h4>TỪ KHÓA LIÊN QUAN</h4>
						<div className="document-detail-tags-list">
							<ul>
								{_.map(tags, (tag, idx) => {
									return (
										<li key={idx}><Link to={'/tag/' + tag.slug}>{tag.name}</Link></li>
									)
								})}
							</ul>
						</div>
					</div>
				)}
			</Fragment>
		);
	}
}

export default Tags;