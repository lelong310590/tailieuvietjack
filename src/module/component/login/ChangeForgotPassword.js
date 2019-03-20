import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import {Link} from 'react-router-dom';
import * as helpers from "../../Support";
import axios from "axios";
import * as api from "../../const/Api";
import queryString from 'query-string';
import _ from "lodash";

class ChangeForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			onProcess: false,
			pass:'',
			repass:''
		}
	}

	handlePass = (event) => {
		let target = event.target;
		let pass = target.value;
		this.setState({
			pass
		});
	};

	handleRepass = (event) => {
		let target = event.target;
		let repass = target.value;
		this.setState({
			repass
		});
	};

	onSubmit = (event) => {
		event.preventDefault();
		let {pass,repass} = this.state;
		if(pass!==repass){
			this.setState({error: 'Nhập lại mật khẩu không khớp!'})
			return;
		}
		const search = this.props.location.search;
		let value = queryString.parse(search);

		let formData = new FormData();

		formData.append('grant_type', 'password');
		formData.append('client_id', '8');
		formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
		formData.append('scope', '');
		formData.append('password', pass);
		formData.append('token', value.token);

		this.setState({onProcess: true});

		axios.post(api.API_SEND_RESET_PASSWORD, formData, {
			headers: {'Content-Type': 'multipart/form-data' }
		})
			.then((response) => {
				this.setState({error: 'Đổi mật khẩu thành công!'})
			})
			.catch((err) => {

			})
			.finally(() => {
				this.setState({onProcess: false})
			})
	};

	render() {
		let {error, onProcess} = this.state;
		return (
			<div className="page-wrapper">
				<div className="container">
					<div className="authen-wrapper">
						<h1 className="text-center">Tạo mới mật khẩu</h1>
						{error !== '' &&
						<Alert bsStyle="success">
							<p>{error}</p>
						</Alert>
						}
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<input type="password" onChange={this.handlePass} className="form-control" placeholder="Mật khẩu mới" required />
							</div>

							<div className="form-group">
								<input type="password" onChange={this.handleRepass} className="form-control" placeholder="Xác thực mật khẩu " required />
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