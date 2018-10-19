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

						<Alert bsStyle="danger">
							<h4>Chú ý:</h4>
							<p>
								Nhập mã xác nhận gửi tới longlengoc90@gmail.com. Tạo một mật khẩu mới để đăng nhập
							</p>
						</Alert>

						<form action="">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Mã xác thực " required />
							</div>

							<div className="form-group">
								<input type="password" className="form-control" placeholder="Mật khẩu " required />
							</div>

							<div className="form-group">
								<input type="password" className="form-control" placeholder="Xác thực mật khẩu " required />
							</div>

							<div className="form-recapcha">
								<ReCAPTCHA
									sitekey="Your client site key"
									onChange={this.onChange}
								/>
							</div>

							<div className="form-group reset-password-action text-center">
								<Link to=""><i className="fas fa-sync-alt"></i> Gửi lại mã xác thực</Link>
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