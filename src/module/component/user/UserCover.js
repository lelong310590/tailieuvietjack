import React, {Component} from 'react';

class UserCover extends Component {
	render() {
		return (
			<div className="user-main-info-wrapper">
				<div className="header-user">
					<img src="/lib/images/user_small.png" alt="" className="img-responsive user-avatar"/>
					<p className="header-user-name">Long Le Ngoc</p>
				</div>

				<div className="user-stats">
					<div className="user-stats-item text-center text-uppercase">
						<p>Tài liệu</p>
						<span>0</span>
					</div>

					<div className="user-stats-item text-center text-uppercase">
						<p>Lượt tải</p>
						<span>0</span>
					</div>
				</div>
			</div>
		);
	}
}

export default UserCover;