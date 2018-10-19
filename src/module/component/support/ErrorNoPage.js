import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ErrorNoPage extends Component {
	render() {
		return (
			<div className="default-content-wrapper">
				<div className="error-page">
					<div className="container">
						<img src="lib/images/404.png" alt="" className="img-responsive center-block"/>

						<h1 className="error-title text-center">OH! CÓ LỖI XẢY RA</h1>
						<p className="error-content text-center">Nội dung bạn tìm kiếm không tồn tại</p>

						<div className="error-form">
							<form action="">
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Tài liệu tìm kiếm"/>
								</div>
								<button className="form-submit"><i className="fas fa-search"></i></button>
							</form>

							<div className="error-return text-center">
								<Link to="/">Trở về trang chủ</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ErrorNoPage;