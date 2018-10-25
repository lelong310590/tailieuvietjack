import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class UserMenu extends Component {
	render() {
		return (
			<div className="user-menu">
				<ul>
					<li><NavLink to="/tai-khoan/1/thong-tin" exact={true} activeClassName={'active'}>Thông tin cá nhân</NavLink> <i className="fas fa-angle-right"></i></li>
					<li><NavLink to="">Doanh thu: <span className="money">0 đ</span></NavLink></li>
					<li><NavLink to="">Số dư: <span className="money">0 đ</span></NavLink></li>
					<li><NavLink to="">Nạp tiền</NavLink> <i className="fas fa-angle-right"></i></li>
					<li><NavLink to="">Rút tiền</NavLink> <i className="fas fa-angle-right"></i></li>
					<li><NavLink to="">Đăng xuất</NavLink></li>
				</ul>
			</div>
		);
	}
}

export default UserMenu;