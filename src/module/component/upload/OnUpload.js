import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import _ from 'lodash';

class OnUpload extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.name
		}
	}

	componentWillMount = () => {
		this.props.getClasses();
	};

	cancelUpload = (index) => {
		this.props.cancelUpload(index)
	};

	handleChangeName = (event) => {
		let name = event.target.value;
		this.setState({name})
	};

	handleChangeClass = (event) => {
		let classes = event.target.value;
		console.log(classes);
	};

	render() {
		let {classes} = this.props.ClassesReducer;
		let {percent, name, index} = this.props;

		let classesElem = _.map(classes, (value, index) => {
			return (
				<option value={value.id} key={index}>{value.name}</option>
			)
		});

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
										Tên tài liệu <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<input
											type="text"
											className="form-control"
											name="name"
											value={this.state.name}
											onChange={this.handleChangeName}
										/>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Trình độ <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control">
											{classesElem}
										</select>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Môn học <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control" onChange={this.handleChangeClass}>
											<option value="">Toán</option>
										</select>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Miêu tả
									</div>
									<div className="upload-result-content-input form-group">
										<textarea name="" cols="30" rows="5" className="form-control"></textarea>
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

const mapDispatchToProps = (dispatch) => {
	return {
		getClasses: () => {
			dispatch(actions.getClasses());
		},

		getSubjectViaClass: (classId) => {
			dispatch(actions.getSubjectViaClass(classId))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (OnUpload);