import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
	render() {
		return (
			<div className="menu-list">
				<div className="class-level-menu">
					<ul>
						<li className="has-child">
							<Link to="">
								<i className="fas fa-graduation-cap"></i> Lớp 8
							</Link>
							<div className="subject-level-menu">
								<ul>
									<li><Link to="">Môn Toán</Link></li>
									<li><Link to="">Môn Lý</Link></li>
									<li><Link to="">Môn Hóa</Link></li>
									<li><Link to="">Môn Văn</Link></li>
									<li><Link to="">Môn Tiếng Anh</Link></li>
									<li><Link to="">Môn Sinh học</Link></li>
									<li><Link to="">Môn Lịch sử</Link></li>
								</ul>
							</div>
						</li>
						<li><Link to=""><i className="fas fa-graduation-cap"></i> Lớp 9</Link></li>
						<li><Link to=""><i className="fas fa-graduation-cap"></i> Lớp 10</Link></li>
						<li><Link to=""><i className="fas fa-graduation-cap"></i> Lớp 11</Link></li>
						<li><Link to=""><i className="fas fa-graduation-cap"></i> Lớp 12</Link></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Menu;