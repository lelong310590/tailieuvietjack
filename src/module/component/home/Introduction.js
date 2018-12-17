import React, {Component} from 'react';

class Introduction extends Component {
	render() {
		return (
			<section className="section-intro">
				<div className="intro-wrapper">
					<h3 className="intro-hero-title">Bạn chưa có tài khoản ?</h3>
					<h4 className="intro-title">Đăng ký ngay để nhận được </h4>
					<div className="intro-list">
						<li><i className="far fa-check-circle"></i> Truy cập hàng triệu tài liệu mới nhất</li>
						<li><i className="far fa-check-circle"></i> Tiếp cận hàng triệu người dùng</li>
					</div>
				</div>
			</section>
		);
	}
}

export default Introduction;