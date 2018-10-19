import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Menu from "./support/Menu";

class Header extends Component {
	render() {
		return (
			<header className="header" id="header">
				<div className="container">
					<div className="header-wrapper">
						<div className="header-main">
							<div className="main-logo">
								<Link to="/">
									<img src="./lib/images/logo.png" alt=""
									     className="img-responsive logo"/>
								</Link>
							</div>
							<div className="menu-button">
								<a href="javascript:;"><i className="fas fa-bars"></i></a>

								<Menu/>
							</div>
						</div>

						<div className="header-sub">
							<div className="main-search">
								<form action="" method="post" role="form">

									<div className="form-group">
										<input type="text" className="form-control" name="" id=""
										       placeholder="Tìm kiếm..."/>
									</div>

									<button type="submit" className="btn btn-primary"><i className="fas fa-search"></i>
									</button>
								</form>
							</div>
							<div className="header-action">
								<a href="" className="action-button button-green"><i
									className="fas fa-piggy-bank"></i> Nạp tiền</a>
								<Link to="/upload-tai-lieu" className="action-button button-yellow">
									<i className="fas fa-file-upload"></i> Tải lên
								</Link>
							</div>
							<div className="header-about">
								<a href=""><i className="fas fa-award"></i></a>
							</div>
							<div className="header-authentication">
								<Link to={'/dang-ky'} className="action-button button-blank">Đăng ký</Link>
								<Link to={'/dang-nhap'} className="action-button button-blank">Đăng nhập</Link>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;