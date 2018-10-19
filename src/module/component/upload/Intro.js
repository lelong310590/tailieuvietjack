import React, {Component} from 'react';
import Dropzone from 'react-dropzone'
import Policy from "./Policy";

class Intro extends Component {

	constructor() {
		super();
		this.state = {
			accepted: [],
			rejected: [],
			disabled: true,
			modalPolicy: false
		}
	}

	onDrop = (accepted, rejected) => {
		console.log(accepted);
	};

	policyModal = (value) => {
		this.setState({
			modalPolicy: value
		})
	};

	policyResponse = (value) => {
		if (value === true) {
			this.setState({
				disabled: false,
			});

			this.refs.dropzoneRef.open();
		}

		this.setState({
			modalPolicy: false
		})
	};

	render() {

		let {disabled, modalPolicy} = this.state;

		return (
			<div className="default-content-wrapper">

				{modalPolicy &&
					<Policy
						policyResponse={this.policyResponse}
					/>
				}

				<div className="container">
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
				</div>
			</div>
		);
	}
}

export default Intro;