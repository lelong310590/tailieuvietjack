import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class SidebarPost extends Component {
	render() {
		return (
			<div className="static-post-sidebar col-xs-12 col-md-3">
				<ul>
					<li><NavLink to={'/static-post/gioi-thieu'} activeClassName={'active'}>Giới thiệu</NavLink></li>
					<li><NavLink to={'/static-post/cau-hoi-thuong-gap'} activeClassName={'active'}>Câu hỏi thường gặp</NavLink></li>
					<li><NavLink to={'/static-post/danh-cho-nguoi-ban'} activeClassName={'active'}>Dành cho người bán</NavLink></li>
					<li><NavLink to={'/static-post/danh-cho-nguoi-mua'} activeClassName={'active'}>Dành cho người mua</NavLink></li>
					<li><NavLink to={'/static-post/huong-dan-thanh-toan'} activeClassName={'active'}>Hướng dẫn thanh toán</NavLink></li>
					<li><NavLink to={'/static-post/quy-dinh-chinh-sach-ban-tai-lieu'} activeClassName={'active'}>Quy định chính sách bán tài liệu</NavLink></li>
				</ul>
			</div>
		);
	}
}

export default SidebarPost;