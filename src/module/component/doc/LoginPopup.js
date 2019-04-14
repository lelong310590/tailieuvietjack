import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as api from './../../const/Api';
import Loading from "../support/Loading";
import {Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as helpers from "../../Support";
import * as actions from "../../action/Index";
import { FacebookLogin } from 'react-facebook-login-component';
import GoogleLogin from 'react-google-login';

class LoginPopup extends Component {

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
				this.props.closeLoginPopup();
			})
			.catch((err) => {
				console.log(err);
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
	}

	responseGoogle = (response) => {
		console.log(response);
		console.log(response.accessToken);
		let formData = new FormData();
		formData.append('avatar', response.w3.Paa);
		formData.append('name', response.w3.ig);
		formData.append('email', response.w3.U3);
		formData.append('id', response.googleId);
		formData.append('grant_type', 'password');
		formData.append('client_id', '8');
		formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
		formData.append('scope', '');
		formData.append('token',response.tokenId);
		this.socialLogin('google', formData);
	}

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
				this.props.closeLoginPopup();
			})
			.catch(err => {
				console.log(err)
			})
	};

	render() {
		let {validEmail, validPassword, error, onProcess} = this.state;
		return (
			<div className="document-report-wrapper">
				<div className="document-report-content">

					<div className="document-report-close">
						<span onClick={() => {this.props.closeLoginPopup()}}><i className="fal fa-times"></i></span>
					</div>

					{/*{onSending &&*/}
						{/*<Loading/>*/}
					{/*}*/}

					<h4 className="document-report-title text-center">Đăng nhập </h4>
					<div className="social-login-wrapper">
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
					</div>
					<div className="document-report-form">
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
								<button type="submit" className="btn vj-btn">Đăng nhập</button>
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

export default connect(mapStateToProps, mapDispatchToProps) (LoginPopup);