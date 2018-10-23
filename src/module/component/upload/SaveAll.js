import React, {Component} from 'react';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

class SaveAll extends Component {

	constructor(props) {
		super(props);
		this.state = {
			saveAllMode: false
		}
	}

	changeSaveAllMode = () => {
		let {saveAllMode} = this.state;
		this.setState({
			saveAllMode: !saveAllMode
		})
	};

	render() {
		return (
			<div className="save-all-mode">
				<div className="cb-save-all">
					<label>
						<Toggle
							defaultChecked={this.state.saveAllMode}
							onChange={this.changeSaveAllMode} />
						<span>Thêm thông tin cho toàn bộ tài liệu tải lên</span>
					</label>
				</div>
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
		);
	}
}

export default SaveAll;