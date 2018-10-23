import React, {Component} from 'react';
import SocialLogin from "../support/SocialLogin";
import {Link} from "react-router-dom";
import MetaTags from 'react-meta-tags';

class Login extends Component {
	render() {
		return (
			<div className="page-wrapper">
				<MetaTags>
					<title>Page 1</title>
					<meta name="description" content="Some description." />
					<meta property="og:title" content="MyApp" />
					<meta property="og:image" content="path/to/image.jpg" />
				</MetaTags>
				<div className="container">
					<div className="authen-wrapper">
						<h1 className="text-center">ĐĂNG NHẬP</h1>
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
						<form action="">
							<div className="form-group">
								<input type="email" className="form-control" placeholder="Email " required/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control" placeholder="Mật khẩu " required/>
							</div>

							<div className="form-group submit-form">
								<button type="submit">Đăng nhập</button>
							</div>

						</form>

						<div className="form-forgot-word text-right">
							<Link to="/quen-mat-khau">Quên mật khẩu ?</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;