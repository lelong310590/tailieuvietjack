import React, {Component} from 'react';
// import SocialButton from "../support/SocialButton";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import * as helpers from './../../Support';
import * as api from './../../const/Api';
import * as actions from './../../action/Index';
import axios from 'axios';
import {Alert} from 'react-bootstrap';

import Meta from "../support/Meta";
import Loading from "../support/Loading";
// import FacebookLogin from 'react-facebook-login';
import { FacebookLogin } from 'react-facebook-login-component';
import GoogleLogin from 'react-google-login';

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

	handleSocialLogin = (data) => {
		//console.log('fb data: ',data);
		if (data._provider === 'facebook') {
			let formData = new FormData();
			formData.append('avatar', data._profile.profilePicURL);
			formData.append('name', data._profile.name);
			formData.append('email', data._profile.email);
			formData.append('id', data._profile.id);
			formData.append('grant_type', 'password');
			formData.append('client_id', '8');
			formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
			formData.append('scope', '');
			formData.append('token',data._token.accessToken);
			this.socialLogin(data._provider, formData);
		}

		console.log(data);
	};

	handleSocialLoginFailure = (err) => {
		console.error(err)
	};

	/**
	 *  Social login
	 * */
	socialLogin = (provider, formData) => {
		let config = {
			headers: {'Content-Type': 'multipart/form-data' }
		};

		let url = '';

		if (provider === 'facebook') {
			url = api.API_POST_FACEBOOK_LOGIN;
		} else if (provider === 'google') {
			url = api.API_POST_GOOGLE_LOGIN;
		}

		axios.post(url, formData, config)
			.then(response => {
				let data = response.data;
				let accessToken = 'Bearer ' + data.access_token;

				localStorage.setItem('accessToken', accessToken);

				this.props.getUserInfo(accessToken);

				this.props.handleLogedIn();
				this.props.history.push("/");
			})
			.catch(err => {
				console.log(err)
			})
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
		formData.append('client_id', '8');
		formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
		formData.append('username', email);
		formData.append('password', password);
		formData.append('scope', '');

		this.setState({onProcess: true});

		axios.post(api.API_LOGIN, formData, {
			headers: {'Content-Type': 'multipart/form-data' }
		})
			.then((response) => {
				this.setState({
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
					error: 'Tài khoản hoặc mật khẩu không đúng'
				})
			})
			.finally(() => {
				this.setState({onProcess: false})
			})
	};

	responseFacebook = (response) => {
		let formData = new FormData();
		formData.append('avatar', response.picture.data.url);
		formData.append('name', response.name);
		formData.append('email', response.email);
		formData.append('id', response.id);
		formData.append('grant_type', 'password');
		formData.append('client_id', '8');
		formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
		formData.append('scope', '');
		formData.append('token',response.accessToken);
		this.socialLogin('facebook', formData);
		console.log(response);
	}

	responseGoogle = (response) => {
		let formData = new FormData();
		formData.append('avatar', response.WE.w3.Paa);
		formData.append('name', response.WE.w3.ig);
		formData.append('email', response.WE.w3.U3);
		formData.append('id', response.WE.googleId);
		formData.append('grant_type', 'password');
		formData.append('client_id', '8');
		formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
		formData.append('scope', '');
		formData.append('token',response.WE.accessToken);
		this.socialLogin('google', formData);
		console.log(response.WE);
	}

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
							{/*<FacebookLogin*/}
								{/*appId="185415292298335" //APP ID NOT CREATED YET*/}
								{/*fields="name,email,picture"*/}
								{/*callback={this.responseFacebook}*/}
							{/*/>*/}
							<FacebookLogin socialId="185415292298335"
										   language="en_US"
										   scope="public_profile,email"
										   responseHandler={this.responseFacebook}
										   xfbml={true}
										   fields="id,email,name,picture"
										   version="v2.5"
										   className="facebook-login"
										   buttonText="Login With Facebook"/>

							<GoogleLogin
								clientId="265995590514-tpvljrouj5jfdqvr7a2isunrkg9n2c17.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
								buttonText="LOGIN WITH GOOGLE"
								onSuccess={this.responseGoogle}
								onFailure={this.responseGoogle}
							/>
							{/*<SocialButton*/}
								{/*provider='facebook'*/}
								{/*appId='185415292298335'*/}
								{/*onLoginSuccess={this.handleSocialLogin}*/}
								{/*onLoginFailure={this.handleSocialLoginFailure}*/}
							{/*>*/}
								{/*<i className="fab fa-facebook-square"></i> Facebook*/}
							{/*</SocialButton>*/}

							{/*<SocialButton*/}
								{/*provider='google'*/}
								{/*appId='265995590514-tpvljrouj5jfdqvr7a2isunrkg9n2c17.apps.googleusercontent.com'*/}
								{/*onLoginSuccess={this.handleSocialLogin}*/}
								{/*onLoginFailure={this.handleSocialLoginFailure}*/}
							{/*>*/}
								{/*<i className="fab fa-google"></i> Google*/}
							{/*</SocialButton>*/}
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