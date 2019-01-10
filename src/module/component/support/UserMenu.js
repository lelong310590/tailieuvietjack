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
					<li><p>Doanh thu: <span className="money">{numeral(profit).format('0,0')} đ</span></p></li>
					<li><p>Số dư: <span className="money">{numeral(totalMoney).format('0,0')} đ</span></p></li>
					<li><NavLink to="">Nạp tiền</NavLink> <i className="fas fa-angle-right"></i></li>
					<li><NavLink to="">Rút tiền</NavLink> <i className="fas fa-angle-right"></i></li>
					<li><Link to="/dang-xuat">Đăng xuất</Link></li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (UserMenu);