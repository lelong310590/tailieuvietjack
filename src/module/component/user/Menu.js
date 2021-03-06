import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

class Menu extends Component {
	render() {

		let {id} = this.props.UserReducer;

		return (
			<div className="col-xs-12 col-md-3" style={{position: 'sticky', top: 90}}>
				<div className="user-main-menu">
					<ul>
						<li><NavLink to={'/tai-khoan/'+ id +'/thong-tin'} exact={true} activeClassName={'active'}><i className="far fa-user"></i> Thông tin cá nhân</NavLink></li>

						<li><NavLink
							to={{ pathname: '/tai-khoan/'+ id +'/quan-ly-tai-lieu', search: 'onsort=active'}}
							exact={true}
							className={(this.props.path === '/tai-khoan/:id/quan-ly-tai-lieu' || this.props.path === '/tai-lieu/sua-tai-lieu/:slug') ? 'active' : ''}
						><i className="far fa-file-alt"></i> Quản lý tài liệu</NavLink></li>
						<li><NavLink
							to={{ pathname: '/tai-khoan/'+ id +'/tai-lieu-da-tai'}}
							exact={true}
							className={this.props.path === '/tai-khoan/:id/tai-lieu-da-tai'? 'active' : ''}
						><i className="far fa-file-alt"></i> Tài liệu đã tải</NavLink></li>
						{/*<li><NavLink to={'/tai-khoan/'+ id +'/quan-ly-tai-chinh'} exact={true} activeClassName={'active'}><i className="fas fa-file-invoice-dollar"></i> Quản lý tài chính</NavLink></li>*/}
						{/*<li><NavLink to="/1"><i className="fas fa-chart-line"></i> Thống kê</NavLink></li>*/}
						<li><a onClick={() => {alert('Tính năng này đang được phát triển')}}><i className="fas fa-file-invoice-dollar"></i> Quản lý tài chính</a></li>
						<li><a onClick={() => {alert('Tính năng này đang được phát triển')}}><i className="fas fa-chart-line"></i> Thống kê</a></li>
					</ul>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (Menu);