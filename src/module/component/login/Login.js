import React, {Component} from 'react';
import SocialLogin from "../support/SocialLogin";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import * as helpers from './../../Support';
import Meta from "../support/Meta";

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			validEmail: true,
			validPassword: true
		}
	}

	handleMail = (event) => {
		let target = event.target;
		let email = target.value;
		let validEmail = helpers.validateEmail(email);
		this.setState({validEmail});
		this.props.handleLoginEmail(email);
	};

	handlePassword = (event) => {
		let target = event.target;
		let password = target.value;
		let validPassword = helpers.validatePassword(password);
		this.setState({validPassword});
		this.props.handleLoginPassword(password);
	};

	render() {

		let {validEmail, validPassword} = this.state;

		return (
			<div className="page-wrapper">

				<Meta
					title={'Đăng nhập'}
				/>

				<div className="container">
					<div className="authen-wrapper">
						<h1 className="text-center">ĐĂNG NHẬP</h1>
						<div className="social-login-wrapper">
							<SocialLogin
								provider='facebook'
								appId='185415292298335'
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
								<input
									type="email"
									className="form-control"
									placeholder="Email "
									name="email"
									required
									onChange={this.handleMail}
								/>

								{!validEmail &&
									<p className="form-error">Định dạng Email không đúng</p>
								}
							</div>

							<div className="form-group">
								<input
									type="password"
									className="form-control"
									placeholder="Mật khẩu "
									required
									onChange={this.handlePassword}
								/>

								{!validPassword &&
									<p className="form-error">Độ dài mật khẩu tối thiều 6 ký t</p>
								}
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

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleLoginEmail: (email) => {
			dispatch(actions.handleLoginEmail(email))
		},

		handleLoginPassword: (password) => {
			dispatch(actions.handleLoginPassword(password))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);