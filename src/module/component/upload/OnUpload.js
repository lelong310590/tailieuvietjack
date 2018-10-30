import React, {Component} from 'react';
import {connect} from 'react-redux';

class OnUpload extends Component {

	cancelUpload = (index) => {
		this.props.cancelUpload(index)
	};

	render() {

		let {percent, name, index} = this.props;

		return (
			<div className="upload-result-wrapper">
				<div className="upload-result-title">
					<p>{percent}% tải lên  •  {name}</p>
					{percent !== 100 &&
						<button className="upload-cancel" onClick={() => this.cancelUpload(index)}>
							Hủy tải lên <i className="far fa-times-circle"></i>
						</button>
					}

					<div className="upload-result-percent" style={{width: percent + '%'}}></div>
				</div>

				{percent === 100 &&
					<div className="save-all-mode">
						<div className="upload-result">
							<div className="upload-result-left">
								<img src="lib/images/bg_changeImg.jpg" alt="" className="img-responsive"/>
							</div>
							<div className="upload-result-right">
								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Trình độ <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control">
											<option value="">Lớp 8</option>
										</select>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Môn học <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control">
											<option value="">Toán</option>
										</select>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Chọn giá bán <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control">
											<option value="">Miễn phí</option>
											<option value="">Tự đặt giá</option>
										</select>

										<input type="number" className="form-control manual-price"/>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Số trang xem trước <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control">
											<option value="">Tự chọn</option>
											<option value="">20%</option>
											<option value="">50%</option>
										</select>

										<input type="number" className="form-control manual-price"/>
									</div>
								</div>

								<hr/>

								<div className="upload-result-submit text-right">
									<button>Lưu</button>
								</div>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps, null) (OnUpload);