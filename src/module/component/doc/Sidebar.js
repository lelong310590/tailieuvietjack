import React, {Component} from 'react';
import TopWeekDoc from "./TopWeekDoc";
import TagCloud from "./TagCloud";
import FilterBar from "../sidebar/FilterBar";

class Sidebar extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentDoctype:0,
			currentSubject:0,
			currentClass:0,
		}
	}

	componentDidMount = () => {
		let {currentDoctype, currentSubject, currentClass} = this.props;
		this.setState({
			currentDoctype, currentSubject, currentClass
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (this.props !== nextProps) {
			this.setState({
				currentDoctype: nextProps.currentDoctype,
				currentSubject: nextProps.currentSubject,
				currentClass: nextProps.currentClass,
			})
		}

		return true;
	};

	render() {
		let {currentDoctype, currentSubject, currentClass} = this.state;
		return (
			<div className="wrap__left">
				<FilterBar
					history={this.props.history}
					location={this.props.location}
					match={this.props.match}
					currentDoctype={currentDoctype}
					currentSubject={currentSubject}
					currentClass={currentClass}
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