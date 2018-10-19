import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SocialLogin from './../support/SocialLogin'
import ReCAPTCHA from "react-google-recaptcha";

class Register extends Component {

	handleSocialLogin = (user) => {
		console.log(user)
	}

	handleSocialLoginFailure = (err) => {
		console.error(err)
	}

	onChange = (value) => {
		console.log("Captcha value:", value);
	}

	render() {
		return (
			<div className="page-wrapper">
				<div className="container">
					<div className="authen-wrapper">
						<h1 className="text-center">ĐĂNG KÝ TÀI KHOẢN</h1>
						<div className="social-login-wrapper">
							<SocialLogin
								provider='facebook'
								appId='11111'
								onLoginSuccess={this.handleSocialLogin}
								onLoginFailure={this.handleSocialLoginFailure}
							>
								<i className="fab fa-facebook-square"></i> Facebook
							</SocialLogin>

							<SocialLogin
								provider='google'
								appId='11111'
								onLoginSuccess={this.handleSocialLogin}
								onLoginFailure={this.handleSocialLoginFailure}
							>
								<i className="fab fa-google"></i> Google
							</SocialLogin>
						</div>
						<small className="text-center">----- hoặc đăng ký bằng email -----</small>
						<form action="">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Họ và tên " required/>
							</div>
							<div className="form-group">
								<input type="email" className="form-control" placeholder="Email " required/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Mật khẩu " required/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Xác nhận mật khẩu" required/>
							</div>

							<div className="form-recapcha">
								<ReCAPTCHA
									sitekey="Your client site key"
									onChange={this.onChange}
								/>
							</div>

							<div className="form-group submit-form">
								<button type="submit">Đăng ký</button>
							</div>

						</form>

						<div className="form-policy text-center">
							Chọn đăng ký là bạn đã đồng ý với <Link to="">Điều khoản & dịch vụ</Link> của VietJack
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;