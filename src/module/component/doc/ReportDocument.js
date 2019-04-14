import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import * as api from './../../const/Api';
import Loading from "../support/Loading";

class ReportDocument extends Component {

	constructor(props) {
		super(props);
		this.state = {
			reportType: 0,
			docId: this.props.docId,
			name: '',
			email: '',
			subject: 'Tài liệu bị lỗi font',
			message: '',
			onSending: false
		}
	}

	componentDidMount = () => {
		let accessToken = localStorage.getItem('accessToken');
		if (accessToken !== null) {
			let {firstName, lastName, email} = this.props.UserReducer;
			this.setState({
				name: firstName + ' ' + lastName,
				email
			})
		}
	};

	shouldComponentUpdate = (nextProps, nextState) => {

		if (nextProps.UserReducer !== this.props.UserReducer) {
			let {firstName, lastName, email} = nextProps.UserReducer;
			this.setState({
				name: firstName + ' ' + lastName,
				email
			})
		}

		return true;
	};

	changeReportType = (e) => {
		let reportType = parseInt(e.target.value);
		let {message, subject} = this.state;
		switch (reportType) {
			case 0:
				subject =  'Tài liệu bị lỗi font';
				message = '';
			case 1:
				subject =  'Tài liệu bị cắt, thiếu nội dung';
				message = '';
			case 2:
				subject =  'Tài liệu spam, quảng cáo';
				message = '';
			case 3:
				subject =  'Tài liệu không phải là tiếng Việt và tiếng Anh';
				message = '';
			case 4:
				subject =  'Tài liệu vi phạm bản quyền';
			case 5:
				subject =  'Tài liệu trùng với tài liệu đã có trên VietJack';
			default:
				subject =  'Tài liệu bị lỗi font';
				message = '';
		}
		this.setState({
			reportType, subject, message
		})
	};

	changeName = (e) => {
		let name = e.target.value;
		this.setState({name})
	};

	changeEmail = (e) => {
		let email = e.target.value;
		this.setState({email})
	};

	changeMessage = (e) => {
		let message = e.target.value;
		this.setState({message})
	};

	sendReport = (e) => {
		e.preventDefault();
		this.setState({onSending: true});
		let {docId, name, email, subject, message} = this.state;
		let formData = new FormData();
		formData.append('docId', docId);
		formData.append('name', name);
		formData.append('email', email);
		formData.append('subject', subject);
		formData.append('message', message);
		formData.append('grant_type', 'password');
		formData.append('client_id', '8');
		formData.append('client_secret', 'TjnV7lkM8c7jIXHk2DvyVAlYDMshqMQ0OdzZZNnf');
		formData.append('scope', '');

		let config = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
			},
		};

		axios.post(api.API_POST_REPORT_DOCUMENT, formData, config)
			.then(response => {
				if (response.data.status === 'success') {
					alert('Gửi báo cáo thành công !');
				} else {
					alert('Có lỗi trong quá trình gửi báo cáo, hãy thử lại sau !');
				}
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				this.setState({onSending: false});
				this.props.closeReport()
			})
	};

	render() {

		let {reportType, name, email, message, onSending} = this.state;

		return (
			<div className="document-report-wrapper">
				<div className="document-report-content">

					<div className="document-report-close">
						<span onClick={() => {this.props.closeReport()}}><i className="fal fa-times"></i></span>
					</div>

					{onSending &&
						<Loading/>
					}

					<h4 className="document-report-title text-center">Bạn hãy chắc chắn khi báo xấu tài liệu này </h4>
					<div className="document-report-form">
						<form onSubmit={this.sendReport}>

							<div className="form-group">
								<label>Họ và tên</label>
								<input type="text" className="form-control" value={name} onChange={this.changeName}/>
							</div>

							<div className="form-group">
								<label>Email</label>
								<input type="text" className="form-control" value={email} onChange={this.changeEmail}/>
							</div>

							<div className="form-group">
								<label>Dạng báo cáo</label>
								<select name="name" className="form-control" value={reportType} onChange={this.changeReportType}>
									<option value={0}>Tài liệu bị lỗi font</option>
									<option value={1}>Tài liệu bị cắt, thiếu nội dung</option>
									<option value={2}>Tài liệu spam, quảng cáo</option>
									<option value={3}>Tài liệu không phải là tiếng Việt và tiếng Anh</option>
									<option value={4}>Tài liệu vi phạm bản quyền</option>
									<option value={5}>Tài liệu trùng với tài liệu đã có trên VietJack</option>
								</select>
							</div>

							{/*{(reportType === 4 || reportType === 5) &&*/}
								<div className="form-group">
									<label>Nội dung báo xấu</label>
									<textarea
										cols="30"
										rows="5"
										className="form-control"
										placeholder={
											reportType === 4 ? 'Nhập email của bạn và nội dung chứng minh bản quyền. Chúng tôi sẽ phản hồi bạn' :
											'Link tài liệu trùng đã có trên VietJack'
										}
										value={message}
										onChange={this.changeMessage}
									></textarea>
								</div>
							{/*}*/}

							<div className="form-group">
								<button type="submit" className="btn vj-vj-btn center-block">Gửi phản hồi</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (ReportDocument);