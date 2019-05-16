import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import numeral from 'numeral';

class UserMenu extends Component {
	render() {

		let {id, profit, totalMoney} = this.props.UserReducer;

		return (
			<div className="user-menu">
				<ul>
					<li><NavLink to={'/tai-khoan/'+ id +'/thong-tin'} exact={true} activeClassName={'active'}>Thông tin cá nhân</NavLink> <i className="fas fa-angle-right"></i></li>
					<li><NavLink to={'/tai-khoan/'+ id +'/quan-ly-tai-lieu?onsort=active'}>Tài liệu của tôi</NavLink> <i className="fas fa-angle-right"></i></li>
					<li><NavLink to={'/tai-khoan/'+ id +'/tai-lieu-da-tai'}>Tài liệu đã tải</NavLink> <i className="fas fa-angle-right"></i></li>
					<li className="logout"><Link to="/dang-xuat">Đăng xuất</Link></li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (UserMenu);