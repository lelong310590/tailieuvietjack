import React, {Component} from 'react';
import SocialLogin from "../support/SocialLogin";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as helpers from './../../Support';
import * as api from './../../const/Api';
import * as actions from './../../action/Index';
import axios from 'axios';
import {Alert} from 'react-bootstrap';

import Meta from "../support/Meta";
import Loading from "../support/Loading";

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			validEmail: true,
			validPassword: true,
			error: '',
			onProcess: false
		}
	}

	handleMail = (event) => {
		let target = event.target;
		let email = target.value;
		let validEmail = helpers.validateEmail(email);
		this.setState({
			email, validEmail
		});
	};

	handlePassword = (event) => {
		let target = event.target;
		let password = target.value;
		let validPassword = helpers.validatePassword(password);
		this.setState({
			password, validPassword
		});
	};

	onLogin = (event) => {
		event.preventDefault();
		let {email, password} = this.state;
		let formData = new FormData();
		formData.append('grant_type', 'password');
		formData.append('client_id', '2');
		formData.append('client_secret', 'fRc0vgW6OhB98hcYRhyeZ42IzoxCJ2sP67nS715Z');
		formData.append('username', email);
		formData.append('password', password);
		formData.append('scope', '');

		this.setState({onProcess: true});

		axios.post(api.API_LOGIN, formData, {
			headers: {'Content-Type': 'multipart/form-data' }
		})
			.then((response) => {
				this.setState({
					onProcess: false,
					error: ''
				});
				//handle success
				let data = response.data;
				let accessToken = 'Bearer ' + data.access_token;

				localStorage.setItem('accessToken', accessToken);

				this.props.getUserInfo(accessToken);

				this.props.handleLogedIn();
				this.props.history.push("/");
			})
			.catch((err) => {
				this.setState({
					onProcess: false,
					error: 'Tài khoản hoặc mật khẩu không đúng'
				})
			})
	};

	render() {

		let {validEmail, validPassword, error, onProcess} = this.state;

		return (
			<div className="page-wrapper">

				<Meta
					title={'Đăng nhập'}
				/>

				<div className="container">
					<div className="authen-wrapper">

						{onProcess && <Loading/>}

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
								appId='265995590514-tpvljrouj5jfdqvr7a2isunrkg9n2c17.apps.googleusercontent.com'
								onLoginSuccess={this.handleSocialLogin}
								onLoginFailure={this.handleSocialLoginFailure}
							>
								<i className="fab fa-google"></i> Google
							</SocialLogin>
						</div>
						<form onSubmit={this.onLogin}>
							{error !== '' &&
								<Alert bsStyle="danger">
									<p>{error}</p>
								</Alert>
							}

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
		handleLogedIn: () => {
			dispatch(actions.handleLogedIn())
		},

		getUserInfo: (token) => {
			dispatch(actions.getUserInfo(token))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);