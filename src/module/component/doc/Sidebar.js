import React, {Component} from 'react';
import TopWeekDoc from "./TopWeekDoc";
import TagCloud from "./TagCloud";
import FilterBar from "../sidebar/FilterBar";

class Sidebar extends Component {
	render() {
		return (
			<div className="wrap__left">
				<FilterBar
					history={this.props.history}
					location={this.props.location}
					match={this.props.match}
				/>
				<TopWeekDoc/>
				<TagCloud
					history={this.props.history}
				/>
			</div>
		);
	}
}

export default Sidebar;