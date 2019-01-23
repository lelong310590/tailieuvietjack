import React, {Component, Fragment} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import Policy from "./Policy";
import OnUpload from "./OnUpload";
import * as api from './../../const/Api';

class Intro extends Component {

	constructor() {
		super();
		this.state = {
			welcome: true, //default true
			accepted: [], // default empty
			rejected: [],
			disabled: true,
			modalPolicy: false,
			onupload: false, // default false,
			//listDocs: []
		}
	}

	onDrop = (fileAccepted, rejected) => {
		//console.log(fileAccepted);
		//console.log(acceptedFiles.length);
		let {accepted} = this.state;

		let idx = _.findIndex(accepted, (f) => {
			return f.lastModified === fileAccepted[0].lastModified
		});

		_.map(fileAccepted, (f, idx) => {
			accepted.push(f);
		});

		if (idx > -1) {
			fileAccepted[0].duplicate = true;
			fileAccepted[0].duplicateFile = accepted[idx];
		}

		this.setState({
			accepted: accepted,
			onupload: true
		});

		if (idx < 0) {
			let token = localStorage.getItem('accessToken');

			_.map(accepted, (file, index) => {
				let formData = new FormData();
				let userEmail = this.props.UserReducer.email;

				let cancelUploadToken = axios.CancelToken.source();
				accepted[index].cancelUploadToken = cancelUploadToken;
				accepted[index].onProgress = true; // check file in on upload progresscing - default true
				accepted[index].duplicate = false; //check file is duplicated or not ?
				accepted[index].duplicateFile = {id: 0, name: null}; //reset the duplicate file

				this.setState({accepted});

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

				if (!accepted[index].fileUploaded) {

					formData.append('file', file);
					formData.append('userEmail', userEmail);

					axios.post(api.API_UPLOAD_DOC, formData, config)
						.then((response) => {
							//console.log(response);
							// Save response data to state
							accepted[index].id = response.data.id;
							accepted[index].error = false;
							accepted[index].onProgress = false;
							accepted[index].totalPage = response.data.countpage;
							accepted[index].fileUploaded = true;
							accepted[index].tagSuggest = response.data.tags;
							// let {listDocs} = this.state;
							// console.log(response);
							// listDocs.push(response.data);

							this.setState({accepted})
						})
						.catch((error) => {
							if (axios.isCancel(error)) {
								if (this.state.accepted.length === 0) {
									this.setState({
										onupload: false
									})
								}
							} else {
								accepted[index].error = true;
								accepted[index].onProgress = false;
								accepted[index].fileUploaded = false;
								this.setState({accepted});
							}
						})
				}

			});
		}
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

						<div className="upload-file-wrapper">
							{(welcome && !onupload) &&
								<Fragment>
									<h1 className="upload-file-intro text-center">Đăng bán và chia sẻ tài liệu lên thư viện điện
										tử lớn nhất Việt Nam</h1>
									< p className="upload-file-description text-center">VietJack sẽ mang đến cho bạn hơn 10 triệu độc giả , thu nhập, danh tiếng và hơn thế nữa</p>
								</Fragment>
							}

							<div className={onupload ? 'upload-file-edit' : 'upload-file-dropzone'}>

								{onupload &&
									<h4 className="upload-file-edit-title text-center">Tải tài liệu lên VietJack</h4>
								}

								<Dropzone
									className="dropzone"
									ref="dropzoneRef"
									accept=".pdf, .doc, .docx"
									onDrop={(accepted, rejected) => { this.onDrop(accepted, rejected); }}
									disabled={this.state.disabled}
								>
									{(welcome && !onupload) &&
										<p className="dropzone-title">Tải tài liệu lên VietJack</p>
									}
									<div className="upload-button">
										{disabled ? (
											<button className="upload-file-button" onClick={() => this.policyModal(true)}>Tải lên</button>
										) : (
											<Fragment>
												{onupload ? (
													<button className="upload-file-upload-more center-block">Tải thêm</button>
												) : (
													<button className="upload-file-button">Tải lên</button>
												)}
											</Fragment>
										)}
									</div>

									{(welcome && !onupload) &&
										<p>Chọn nút tải lên để chọn nhiều file từ máy tính của bạn hoặc kéo file thả vào đây</p>
									}
								</Dropzone>
							</div>

							{(welcome && !onupload) &&
								<div className="upload-promotion text-center">
									<h4>Lý do bạn đăng tài liệu tại VietJack</h4>
									<div className="row">
										<div className="upload-promotion text-center col-xs-12 col-md-3">
											<i className="fas fa-users"></i>
											<p>Tiếp cận 10 triệu độc giả hàng tháng</p>
										</div>

										<div className="upload-promotion text-center col-xs-12 col-md-3">
											<i className="fas fa-users"></i>
											<p>Gia tăng thu nhập từ chính ấn phẩm của bạn</p>
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
							}

							{onupload &&
							<section className="upload-file-edit">

								{_.map(accepted, (value, index) => {
									return (
										<OnUpload
											key={index}
											percent={value.percent}
											name={value.name}
											cancelUpload={this.cancelUpload}
											id={value.id}
											upLoadError={value.error}
											totalPage={value.totalPage}
											onProgress={value.onProgress}
											duplicate={value.duplicate}
											duplicateFile={value.duplicateFile}
											tagSuggest={value.tagSuggest}
										/>
									)
								})}
							</section>
							}
						</div>

				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (Intro);