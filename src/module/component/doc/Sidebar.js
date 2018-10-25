import React, {Component} from 'react';
import TopWeekDoc from "./TopWeekDoc";
import Related from "./Related";

class Sidebar extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-3">
				<TopWeekDoc/>
				<Related/>
			</div>
		);
	}
}

export default Sidebar;