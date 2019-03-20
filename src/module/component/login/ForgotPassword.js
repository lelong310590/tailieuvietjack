import React, {Component} from 'react';
import axios from "axios";
import * as api from "../../const/Api";
import {Alert} from "react-bootstrap";
import * as helpers from "../../Support";
import Loading from "../support/Loading";

class ForgotPassword extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			error: '',
			validEmail: true,
			onProcess: false
		}
	}

	onSubmit = (event) => {
		event.preventDefault();
		let {email} = this.state;
		let formData = new FormData();

		formData.append('grant_type', 'password');
		formData.append('client_id', '8');
		formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
		formData.append('scope', '');
		formData.append('email', email);

		this.setState({onProcess: true});

		axios.post(api.API_SEND_RESET_PASSWORD_EMAIL, formData, {
			headers: {'Content-Type': 'multipart/form-data' }
		})
			.then((response) => {
				this.setState({error: 'Đã gửi email thay đổi mật khẩu!'})
			})
			.catch((err) => {

			})
			.finally(() => {
				this.setState({onProcess: false})
			})
	};

	handleMail = (event) => {
		let target = event.target;
		let email = target.value;
		let validEmail = helpers.validateEmail(email);
		this.setState({
			email, validEmail
		});
	};

	render() {
		let {error, onProcess} = this.state;
		return (
			<div className="page-wrapper">
				<div className="container">
					<div className="authen-wrapper forgot-password">
						{onProcess && <Loading/>}
						<h1 className="text-center">Trợ giúp lấy lại mật khẩu</h1>
						{error !== '' &&
						<Alert bsStyle="success">
							<p>{error}</p>
						</Alert>
						}
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<input type="email" className="form-control" placeholder="Email " required
									   onChange={this.handleMail}
								/>
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