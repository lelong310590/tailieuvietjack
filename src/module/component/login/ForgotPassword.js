import React, {Component} from 'react';
import SocialLogin from "../support/SocialLogin";

class ForgotPassword extends Component {
	render() {
		return (
			<div className="page-wrapper">
				<div className="container">
					<div className="authen-wrapper forgot-password">
						<h1 className="text-center">Trợ giúp lấy lại mật khẩu</h1>
						<form action="">
							<div className="form-group">
								<input type="email" className="form-control" placeholder="Email " required />
							</div>

							<div className="form-group submit-form">
								<button type="submit">Tiếp tục <i className="far fa-paper-plane"></i></button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;