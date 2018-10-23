import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserMenu extends Component {
	render() {
		return (
			<div className="user-menu">
				<ul>
					<li><Link to="">Thông tin cá nhân</Link> <i className="fas fa-angle-right"></i></li>
					<li><Link to="">Doanh thu: <span className="money">0 đ</span></Link></li>
					<li><Link to="">Số dư: <span className="money">0 đ</span></Link></li>
					<li><Link to="">Nạp tiền</Link> <i className="fas fa-angle-right"></i></li>
					<li><Link to="">Rút tiền</Link> <i className="fas fa-angle-right"></i></li>
					<li><Link to="">Đăng xuất</Link></li>
				</ul>
			</div>
		);
	}
}

export default UserMenu;