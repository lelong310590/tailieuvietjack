import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import {Link} from 'react-router-dom';

class ChangeForgotPassword extends Component {
	render() {
		return (
			<div className="page-wrapper">
				<div className="container">
					<div className="authen-wrapper">
						<h1 className="text-center">Tạo mới mật khẩu</h1>

						<form action="">
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Mật khẩu mới" required />
							</div>

							<div className="form-group">
								<input type="password" className="form-control" placeholder="Xác thực mật khẩu " required />
							</div>

							<div className="form-group submit-form">
								<button type="submit">Tạo mật khẩu <i className="far fa-paper-plane"></i></button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ChangeForgotPassword;