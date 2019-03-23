import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
//import Menu from "./support/Menu";
import UserMenu from "./support/UserMenu";
//import MainSearch from "./home/MainSearch";

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		}
	}
	getInitialState() {
        return { showMenu: false, showSidebar: false };
    }

	showMenu = () => {
		this.setState({ showMenu: true});
	};

	colseMenu = () => {
		this.setState({ showMenu: false });
	};

	showSidebar = () => {
		document.body.classList.add('show__sidebar');
		this.setState({ showSidebar: true});
	};

	colseSidebar = () => {
		document.body.classList.remove('show__sidebar');
		this.setState({ showSidebar: false });
	};


	render() {
		let {AuthReducer, UserReducer} = this.props;

		let {firstName, lastName, thumbnail} = UserReducer;

		return (
			<header className="main">
				<div className="container">
					<a href="javascript:void(0)" className="mb__menu-main mb__left" onClick={this.showSidebar}><i className="fas fa-list"></i></a>
					<Link to="/" className="logo"><img src="/lib/images/logo.png" alt=""/></Link>
					<a href="javascript:void(0)" onClick={this.showMenu} className="mb__menu-main mb__menu"><i className="fas fa-bars"></i></a>
					<a href="javascript:void(0)" onClick={this.colseMenu} className={this.state.showMenu ? 'mb_menu_close show__menu':'mb_menu_close'}><i className="fal fa-times"></i></a>
					<a href="javascript:void(0)" onClick={this.colseSidebar} className="mb_wrap-left_close"><i className="fal fa-times"></i></a>
					<nav className={this.state.showMenu ? 'main show__menu':'main'}>
						<div className="menu">
							<ul className="menu-main">
								<li>
									<a href="javascript:void(0)">Danh mục <i className="far fa-chevron-down"></i></a>
									<ul className="menu-sub">
										<li>
											<h5><Link to="/">Bài giảng</Link></h5>
											<ul>
												<li><Link to="/">Bài giảng 1</Link></li>
												<li><Link to="/">Bài giảng 2</Link></li>
												<li><Link to="/">Bài giảng 3</Link></li>
												<li><Link to="/">Bài giảng 1</Link></li>
												<li><Link to="/">Bài giảng 2</Link></li>
												<li><Link to="/">Bài giảng 3</Link></li>
											</ul>
										</li>
										<li>
											<h5><Link to="/">Chuyên đề</Link></h5>
											<ul>
												<li><Link to="/">Bài giảng 1</Link></li>
												<li><Link to="/">Bài giảng 2</Link></li>
												<li><Link to="/">Bài giảng 3</Link></li>
												<li><Link to="/">Bài giảng 1</Link></li>
												<li><Link to="/">Bài giảng 2</Link></li>
												<li><Link to="/">Bài giảng 3</Link></li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div className="search">
							<input type="text" className="ipt" />
							<button className="btn-search"><i className="fal fa-search"></i></button>
						</div>
						<a href="javascript:void(0)" onClick={() => alert('Tính năng này đang được phát triển')} className="btn-pay"><i className="fal fa-hand-holding-usd"></i> <span>Nạp tiền</span></a>
						<Link to="/upload-tai-lieu" className="btn-upload"><i className="fal fa-upload"></i> <span>Tải lên</span></Link>
						{!AuthReducer.loggedIn ? (
						<div className="header-authentication nologged">
							<Link to={'/dang-ky'} className="btn vj-btn register">Đăng ký</Link>
							<Link to={'/dang-nhap'} className="login">Đăng nhập</Link>
						</div>
						) : (
						<div className="header-authentication logged-in">
							<div className="header-user">
								<img src={thumbnail ? thumbnail : '/lib/images/user_small.png'} alt="" className="img-responsive user-avatar"/>
								<p className="header-user-name">{firstName} {lastName}</p>
							</div>
							<UserMenu/>
						</div>
						)}
					</nav>
				</div>
			</header>

			// <header className="header" id="header">
			// 	<div className="container">
			// 		<div className="header-wrapper">
			// 			<div className="header-main">
			// 				<div className="main-logo">
			// 					<Link to="/">
			// 						<img src="/lib/images/logo.png" alt=""
			// 						     className="img-responsive logo"/>
			// 					</Link>
			// 				</div>
			// 				{/*<div className="menu-button">*/}
			// 					{/*<a href="#"><i className="fas fa-bars"></i></a>*/}
			// 					{/*<Menu/>*/}
			// 				{/*</div>*/}
			// 			</div>

			// 			<div className="header-sub">
			// 				<div className="header-action">
			// 					<span onClick={() => alert('Tính năng này đang được phát triển')} className="action-button button-green"><i
			// 						className="fas fa-piggy-bank"></i> Nạp tiền</span>
			// 					<Link to="/upload-tai-lieu" className="action-button button-yellow">
			// 						<i className="fas fa-file-upload"></i> Tải lên
			// 					</Link>
			// 				</div>
			// 				<div className="header-about">
			// 					<Link to={'/static-post/gioi-thieu'}><i className="fas fa-award"></i></Link>
			// 				</div>

			// 				{!AuthReducer.loggedIn ? (
			// 					<div className="header-authentication">
			// 						<Link to={'/dang-ky'} className="action-button button-blank">Đăng ký</Link>
			// 						<Link to={'/dang-nhap'} className="action-button button-blank">Đăng nhập</Link>
			// 					</div>
			// 				) : (
			// 					<div className="header-authentication logged-in">
			// 						<div className="header-user">
			// 							<img src={thumbnail ? thumbnail : '/lib/images/user_small.png'} alt="" className="img-responsive user-avatar"/>
			// 							<p className="header-user-name">{firstName} {lastName}</p>
			// 						</div>

			// 						<UserMenu/>
			// 					</div>
			// 				)}
			// 			</div>
			// 		</div>
			// 	</div>
			// </header>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (Header);