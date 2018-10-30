import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import Policy from "./Policy";
import UploadContent from "./UploadContent";
import OnUpload from "./OnUpload";

class Intro extends Component {

	constructor() {
		super();
		this.state = {
			welcome: true, //default true
			accepted: [],
			rejected: [],
			disabled: true,
			modalPolicy: false,
			onupload: false, // default false,
			listDocs: []
		}
	}

	onDrop = (accepted, rejected) => {

		this.setState({
			accepted: accepted,
			onupload: true
		});

		let token = localStorage.getItem('accessToken');

		_.map(accepted, (file, index) => {

			let cancelUploadToken = axios.CancelToken.source();
			accepted[index].cancelUploadToken = cancelUploadToken;
			this.setState({accepted});

			let formData = new FormData();
			let userEmail = this.props.UserReducer.email;

			formData.append('file', file);
			formData.append('userEmail', userEmail);

			let config = {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
					Authorization: token
				},
				onUploadProgress: progressEvent => {
					let percent = Math.round(progressEvent.loaded / progressEvent.total * 100);
					if (accepted[index] !== undefined) {
						accepted[index].percent = percent;
					}

					this.setState({accepted})
				},
				cancelToken: accepted[index].cancelUploadToken.token
			};

			axios.post('http://0ab81d06.ngrok.io/v1/doc/upload', formData, config)
				.then((response) => {
					let {listDocs} = this.state;
					listDocs.push(response.data);
				})
				.catch((error) => {
					if (axios.isCancel(error)) {
						if (this.state.accepted.length === 0) {
							this.setState({onupload: false})
						}
					} else {
						console.log(error);
					}
				})
		});
	};

	policyModal = (value) => {
		let loggedIn = this.props.AuthReducer.loggedIn;
		if (loggedIn) {
			this.setState({
				modalPolicy: value
			})
		} else {
			alert("Bạn hãy đăng nhập để tải lên tài liệu bạn muốn!");
			this.props.history.push('/dang-nhap')
		}

	};

	policyResponse = (value) => {
		if (value === true) {
			this.setState({
				disabled: false,
			},() => this.refs.dropzoneRef.open());
		}

		this.setState({
			modalPolicy: false
		})
	};

	cancelUpload = (index) => {
		let {accepted} = this.state;
		accepted[index].cancelUploadToken.cancel();
		accepted.splice(index, 1);
		this.setState({accepted})
	};

	render() {

		let {disabled, modalPolicy, accepted, onupload, welcome} = this.state;

		return (
			<div className="default-content-wrapper">

				{modalPolicy &&
					<Policy
						policyResponse={this.policyResponse}
					/>
				}

				<div className="container">
					{(welcome && !onupload) &&
						<div className="upload-file-wrapper">
							<h1 className="upload-file-intro text-center">Đăng bán và chia sẻ tài liệu lên thư viện điện tử lớn nhất Việt Nam</h1>
							<p className="upload-file-description text-center">VietJack sẽ mang đến cho bạn hơn 10 triệu độc giả , thu nhập, danh tiếng và hơn thế nữa</p>

							<div className="upload-file-dropzone">
								<Dropzone
									className="dropzone"
									ref="dropzoneRef"
									accept="image/jpeg, image/png"
									onDrop={(accepted, rejected) => { this.onDrop(accepted, rejected); }}
									disabled={this.state.disabled}
								>
									<p className="dropzone-title">Tải tài liệu lên VietJack</p>
									<div className="upload-button">
										{disabled ? (
											<button onClick={() => this.policyModal(true)}>Tải lên</button>
										) : (
											<button>Tải lên</button>
										)}
									</div>
									<p>Chọn nút tải lên để chọn nhiều file từ máy tính của bạn hoặc kéo file thả vào đây</p>
								</Dropzone>
							</div>

							<div className="upload-promotion text-center">
								<h4>Lý do bạn đăng tài liệu tại VietJack</h4>
								<div className="row">
									<div className="upload-promotion text-center col-xs-12 col-md-3">
										<i className="fas fa-users"></i>
										<p>Tiếp cận 10 triệu độc giả hàng tháng</p>
									</div>

									<div className="upload-promotion text-center col-xs-12 col-md-3">
										<i className="fas fa-users"></i>
										<p>Tiếp cận 10 triệu độc giả hàng tháng</p>
									</div>

									<div className="upload-promotion text-center col-xs-12 col-md-3">
										<i className="fas fa-users"></i>
										<p>Tiếp cận 10 triệu độc giả hàng tháng</p>
									</div>

									<div className="upload-promotion text-center col-xs-12 col-md-3">
										<i className="fas fa-users"></i>
										<p>Tiếp cận 10 triệu độc giả hàng tháng</p>
									</div>
								</div>
							</div>
						</div>
					}

					{this.state.onupload &&
						<section className="upload-file-edit">
							<h4 className="upload-file-edit-title text-center">Tải tài liệu lên VietJack</h4>
							<button className="upload-file-upload-more center-block">Tải thêm</button>
							{_.map(accepted, (value, index) => {
								return (
									<OnUpload
										key={index}
										percent={value.percent}
										name={value.name}
										cancelUpload={this.cancelUpload}
										index={index}
									/>
								)
							})}
						</section>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (Intro);