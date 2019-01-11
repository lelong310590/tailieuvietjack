import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

class TagsFooter extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			classLevel: ''
		}
	}

	componentDidMount = () => {
		this.setState({
			tags: this.props.tags,
			classLevel: this.props.classLevel
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props.classLevel !== nextProps.classLevel) {
			this.setState({
				classLevel: nextProps.classLevel
			})
		}

		if (this.props.tags !== nextProps.tags) {
			this.setState({
				tags: nextProps.tags
			})
		}

		return true;
	};

	render() {

		let {classLevel, tags} = this.state;

		return (
			<Fragment>
				{!_.isEmpty(tags) &&
					<div className="container">
						<div className="tag-footer">
							<h4 className="tag-footer-title">Các từ khóa phổ biến trong "{classLevel}"</h4>
							<div className="tag-footer-wrapper">
								<ul>
									{_.map(tags, (t, idx) => {
										return (
											<li key={idx}><Link to={'/tag/' + t.slug}>{t.name}</Link></li>
										)
									})}
								</ul>
							</div>
						</div>
					</div>
				}
			</Fragment>
		);
	}
}

export default TagsFooter;