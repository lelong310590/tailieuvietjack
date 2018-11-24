import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Breadcrumb extends Component {
	render() {
		return (
			<div className="breadcrumb-wrapper">
				<ul>
					<li><Link to="/"><i className="fas fa-home"></i> Trang chủ</Link></li>
					<li><Link to={'/cat/' + this.props.classSlug}><i className="fas fa-chevron-right"></i> {this.props.classLevel}</Link></li>
					<li><Link to={'/cat/' + this.props.classSlug + '/' + this.props.subjectSlug}><i className="fas fa-chevron-right"></i> {this.props.subject}</Link></li>
				</ul>
			</div>
		);
	}
}

export default Breadcrumb;