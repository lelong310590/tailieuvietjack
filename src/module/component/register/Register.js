import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SocialLogin from './../support/SocialLogin'
import ReCAPTCHA from "react-google-recaptcha";
import * as helper from './../../Support';
import * as api from './../../const/Api';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import axios from 'axios';
import {Alert} from 'react-bootstrap';
import Loading from "../support/Loading";

class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fullName: '',
			email: '',
			password: '',
			errorMessage: '',
			validEmail: false,
			validPassword: false,
			validRepassword: false,
			onProcess: false,
			registerDone: false
		}
	}

	handleSocialLogin = (data) => {
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

			this.socialLogin(data._provider, formData);
		}
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

	onChange = (value) => {
		console.log("Captcha value:", value);
	};

	handleChange = (event) => {
		let value = event.target.value;
		let name = event.target.name;
		this.setState({
			[name]: value
		})
	};

	handleChangeMail = (event) => {
		let email = event.target.value;
		if (helper.validateEmail(email)) {
			this.setState({
				validEmail: true,
				email: email
			})
		}
	};

	handleChangePassword = (event) => {
		let password = event.target.value;
		if (helper.validatePassword(password)) {
			this.setState({
				validPassword: true,
				password: password
			})
		}
	};

	handleChangeRepass = (event) => {
		let repassword = event.target.value;
		let {password} = this.state;
		if (helper.validateSamePassword(password, repassword)) {
			this.setState({
				validRepassword: true
			})
		}
	};

	handleSubmit = (event) => {
		this.setState({onProcess: true});
		
		event.preventDefault();
		let {fullName, email, password} = this.state;
		let formData = new FormData();
		formData.append('fullName', fullName);
		formData.append('email', email);
		formData.append('password', password);
		formData.append('grant_type', 'password');
		formData.append('client_id', '8');
		formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
		formData.append('scope', '');

		axios.post(api.API_REGISTER, formData, {
			headers: {'Content-Type': 'multipart/form-data' }
		})
			.then((response) => {
				console.log(response);
				this.setState({registerDone: true});
				//this.loginAfterRegister(formData);
			})
			.catch((err) => {
				if (err.response.status === 409) {
					this.setState({
						errorMessage: 'Địa chỉ email này đã được sử dụng',
					})
				}
			})
			.finally(() => {
				this.setState({onProcess: false})
			})
	};

	render() {

		let {validEmail, validPassword, validRepassword, errorMessage, onProcess, registerDone} = this.state;

		return (
			<div className="page-wrapper">
				<div className="container">
					<div className="authen-wrapper">

						{onProcess && <Loading/>}

						<h1 className="text-center">ĐĂNG KÝ TÀI KHOẢN</h1>

						{registerDone &&
							<Alert bsStyle="success">
								Chúc mừng ! Bạn đã đăng ký tài khoản thành công<br/>
								Click <Link to={'/dang-nhap'}>vào đây</Link> để đăng nhập
							</Alert>
						}

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
						<small className="text-center">----- hoặc đăng ký bằng email -----</small>
						<form onSubmit={this.handleSubmit}>

							{errorMessage !== '' &&
								<Alert bsStyle="danger">
									{errorMessage}
								</Alert>
							}

							<div className="form-group">
								<input
									type="text"
									className="form-control"
									placeholder="Họ và tên "
									required name="fullName"
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									className="form-control"
									placeholder="Email "
									required name="email"
									onChange={this.handleChangeMail}
								/>
								{!validEmail && <p className="form-error">Định dạng Email không đúng</p> }
							</div>
							<div className="form-group">
								<input
									type="password"
									className="form-control"
									placeholder="Mật khẩu "
									required name="password"
									onChange={this.handleChangePassword}
								/>
								{!validPassword && <p className="form-error">Độ dài mật khẩu tối thiều 6 ký tự</p>}
							</div>
							<div className="form-group">
								<input
									type="password"
									className="form-control"
									placeholder="Xác nhận mật khẩu"
									required name="repassword"
									onChange={this.handleChangeRepass}
								/>
								{!validRepassword && <p className="form-error">Mật khẩu xác nhận không đúng</p>}
							</div>

							{/*<div className="form-recapcha">*/}
								{/*<ReCAPTCHA*/}
									{/*sitekey="Your client site key"*/}
									{/*onChange={this.onChange}*/}
								{/*/>*/}
							{/*</div>*/}

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

export default connect(null, mapDispatchToProps) (Register);