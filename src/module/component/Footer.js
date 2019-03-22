import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FacebookProvider, Page } from 'react-facebook';

class Footer extends Component {
	render() {
		return (
			<div className="footer-vj">
				<footer className="footer-wrap">
					<div className="container">
						<div className="row">
							<div className="col-md-3">
								<a href="https://khoahoc.vietjack.com" className="logo footer-logo">
									<img alt="" width="" height="" src="https://khoahoc.vietjack.com/frontend/images/logo-white.png" />
								</a>
								<div className="social-icons-top">
									<ul className="social-icons clearfix">
										<li className="facebook pull-left">
											<a href="https://www.facebook.com/hoc.cung.vietjack" target="_blank" title="Facebook">
												<i className="fab fa-facebook-f"></i>
											</a>
										</li>
										<li className="googleplus pull-left">
											<a href="https://plus.google.com/115811842818849244008" target="_blank" data-placement="bottom" title="VietJack @ Google+">
												<i className="fab fa-google-plus-g"></i>
											</a>
										</li>
										<li className="youtube pull-left">
											<a href="https://goo.gl/Dsf8AE" target="_blank" title="Kênh Youtube VietJack">
												<i className="fab fa-youtube"></i>
											</a>
										</li>
									</ul>
								</div>
								<ul className="bottom">
									<li>
										<label className="txt">Phone</label>
										<span className="node">0389933602</span>
									</li>
									<li>
										<label className="txt">Email</label>
										<a href="mailto:vietjackteam@gmail.com" className="node">vietjackteam@gmail.com</a>
									</li>
								</ul>
							</div>
							<div className="col-md-6">
								<div className="row">
									<div className="col-md-6">
										<h4>Thông tin Vietjack</h4>
										<ul>
											<li><Link to={'/static-post/danh-cho-nguoi-ban'}>Dành cho người bán</Link></li>
											<li><Link to={'/static-post/danh-cho-nguoi-mua'}>Dành cho người mua</Link></li>
										</ul>
									</div>
									<div className="col-md-6">
										<h4>Về Vietjack</h4>
										<ul>
											<li><Link to={'/static-post/gioi-thieu'}>Giới thiệu</Link></li>
											<li><Link to={'/static-post/cau-hoi-thuong-gap'}>Câu hỏi thường gặp</Link></li>
											<li><Link to={'/static-post/quy-dinh-chinh-sach-ban-tai-lieu'}>Quy định chính sách bán tài liệu</Link></li>
											<li><Link to={'/static-post/huong-dan-thanh-toan'}>Hướng dẫn thanh toán</Link></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-md-3">
								<iframe src="//www.facebook.com/plugins/likebox.php?href=https://www.facebook.com/hoc.cung.vietjack&amp;colorscheme=light&amp;show_faces=true&amp;stream=false&amp;header=false&amp;height=300&amp;width=307" scrolling="no" frameBorder="0" allowtransparency="false"></iframe>
							</div>
						</div>
					</div>
					
				</footer>
				<div className="copyright text-center">2019 © All Rights Reserved.</div>
			</div>
		);
	}
}

export default Footer;