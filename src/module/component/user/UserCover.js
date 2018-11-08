import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserCover extends Component {
	render() {

		let {firstName, lastName, docCount, docDownload, thumbnail} = this.props.UserReducer;

		return (
			<div className="user-main-info-wrapper">
				<div className="header-user">
					<img src={thumbnail ? thumbnail : '/lib/images/user_small.png'} alt="" className="img-responsive user-avatar"/>
					<p className="header-user-name">{firstName} {lastName}</p>
				</div>

				<div className="user-stats">
					<div className="user-stats-item text-center text-uppercase">
						<p>Tài liệu</p>
						<span>{docCount}</span>
					</div>

					<div className="user-stats-item text-center text-uppercase">
						<p>Lượt tải</p>
						<span>{docDownload}</span>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (UserCover);