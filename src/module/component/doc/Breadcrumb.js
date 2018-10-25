import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Breadcrumb extends Component {
	render() {
		return (
			<div className="breadcrumb-wrapper">
				<ul>
					<li><Link to="/"><i className="fas fa-home"></i> Trang chủ</Link></li>
					<li><Link to="/"><i className="fas fa-chevron-right"></i> Lớp 8</Link></li>
					<li><Link to="/"><i className="fas fa-chevron-right"></i> Môn toán</Link></li>
				</ul>
			</div>
		);
	}
}

export default Breadcrumb;