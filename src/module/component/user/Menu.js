import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class Menu extends Component {
	render() {
		return (
			<div className="col-xs-12 col-md-3">
				<div className="user-main-menu">
					<ul>
						<li><NavLink to="/tai-khoan/1/thong-tin" exact={true} activeClassName={'active'}><i className="far fa-user"></i> Thông tin cá nhân</NavLink></li>
						<li><NavLink to="/1"><i className="far fa-file-alt"></i> Quản lý tài liệu</NavLink></li>
						<li><NavLink to="/1"><i className="fas fa-file-invoice-dollar"></i> Quản lý tài chính</NavLink></li>
						<li><NavLink to="/1"><i className="fas fa-chart-line"></i> Thống kê</NavLink></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Menu;