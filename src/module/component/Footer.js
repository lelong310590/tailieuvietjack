import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component {
	render() {
		return (
			<footer className="footer" id="footer">
				<div className="footer-top">
					<div className="container">
						<div className="row">
							<div className="footer-left col-xs-12 col-md-9">
								<ul className="link">
									<li><Link className="bold-link" to="">Dành cho người bán</Link></li>
									<li><Link className="bold-link" to="">Dành cho người mua</Link></li>
									<li><Link to="">Hướng dẫn thanh toán</Link></li>
									<li><Link to="">Giới thiệu</Link></li>
									<li><Link to="">Câu hỏi thường gặp</Link></li>
									<li><Link to="">Quy định chính sách bán tài liệu</Link></li>
									<li><Link to="">Hướng dẫn thanh toán</Link></li>
								</ul>
							</div>
						</div>
						<div className="footer-right col-xs-12 col-md-3">

						</div>
					</div>
				</div>
				
				<div className="copyright">
					<div className="container">
						<div className="footer-logo">
							<Link to="/">
								<img src="lib/images/logo.png" alt="" className="img-responsive"/>
							</Link>
							<p>Bản quyền thuộc về VietJack © 2018.</p>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;