import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import * as helpers from './../../Support';
import _ from 'lodash';
import Cropper from 'react-cropper'; //Import Cropper Component
import 'cropperjs/dist/cropper.css';
import TagEditor from "./TagEditor";  //Import file style

class OnUpload extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: helpers.trimFileName(this.props.name),
			customPrice: false,
			customPagePreview: 0, //0: manual - 1: 20% - 2: 50%
			tempThumbnail: null, //store file while first upload
			modalCrop: false,
			thumbnail: null, // store file after crop,
			classes: 0,
			subject: 0,
			description: null,
			price: 0,
			pagePreview: 1,
			upLoadError: true,
			id: 0,
			page: 0,
			totalPage: 0,
			onProgress: true,
			duplicate: false,
			duplicateFile: {id: 0, name: null},
			tags: [],
			tagSuggest: []
		}
	}

	componentWillMount = () => {
		this.props.getClasses();
	};

	UNSAFE_componentWillReceiveProps = (nextProps) => {
		let {
			percent, upLoadError, id, page, totalPage, onProgress, duplicate, duplicateFile, tagSuggest
		} = nextProps;
		//console.log(upLoadError === false);

		this.setState({duplicate, duplicateFile});

		if (percent === 100) {
			this.setState({
				upLoadError: (upLoadError === undefined) ? true : upLoadError,
				id, page, totalPage, onProgress, tagSuggest
			})
		}
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
		this.props.getSubjectViaClass(classes);
		this.setState({classes})
	};

	handleChangeSubject = (event) => {
		let subject = event.target.value;
		this.setState({subject})
	};

	handleChangeDescription = (event) => {
		let description = event.target.value;
		this.setState({description})
	};

	handleChangePrice = (event) => {
		let price = event.target.value;
		this.setState({price})
	};

	handleChangeCustomPagePreview = (event) => {
		let customPagePreview = parseInt(event.target.value);
		this.setState({customPagePreview})
	};

	actionChangeThumbnail = (event) => {
		this.refs.fileUploader.click();
	};

	handleChangeThumbnail = (event) => {
		let tempThumbnail = event.target.files;
		const reader = new FileReader();
		reader.readAsDataURL(tempThumbnail[0]);
		reader.onload = () => {
			if (!!reader.result) {
				this.setState({
					tempThumbnail: reader.result,
					modalCrop: true
				})
			} else {
				console.log('Failed converting to base64');
			}
		};
	};

	handleCustomPrice = (event) => {
		let value = parseInt(event.target.value);
		if (value === 1) {
			this.setState({customPrice: true})
		} else {
			this.setState({
				customPrice: false,
				price: 0,
				pagePreview: 2
			})
		}
	};

	/**
	 *  Start function to crop thumbnail
	 */
	onCrop = () => {
		// image in dataUrl
		this.setState({
			modalCrop: false,
			thumbnail: this.cropper.getCroppedCanvas().toDataURL()
		});
		//console.log(this.cropper.getCroppedCanvas().toDataURL());
	};

	onCancelCrop = () => {
		this.setState({modalCrop: false})
	};

	onChangeTags = (t) => {
		let {tags} = this.state;
		// console.log('t: ', t);
		// console.log('tags: ', tags);
		tags.push(t);
		this.setState({tags})
	};

	render() {
		let {classes} = this.props.ClassesReducer;
		let {subjectInClass} = this.props.SubjectReducer;
		let {percent, name, index} = this.props;
		let {
			customPrice, tempThumbnail, modalCrop, thumbnail, subject, description, price,
			pagePreview, customPagePreview, upLoadError, totalPage, onProgress, duplicate, duplicateFile,
			tagSuggest
		} = this.state;

		let classesElem = _.map(classes, (value, index) => {
			return (
				<option value={value.id} key={index}>{value.name}</option>
			)
		});

		let subjectsElem = _.map(subjectInClass, (value, index) => {
			return (
				<option value={value.id} key={index}>{value.name}</option>
			)
		});

		return (
			<div className="upload-result-wrapper">

				{modalCrop &&
					<div className="crop-modal">
						<div className="crop-modal-inner">
							<p className="crop-modal-guide">
								<i className="fas fa-info-circle"></i> Sử dụng thanh cuộn chuột để zoom ảnh
							</p>
							<Cropper
								ref={cropper => { this.cropper = cropper; }}
								src={tempThumbnail}
								style={{height: 400, maxWidth: 500}}
								// Cropper.js options
								aspectRatio={150 / 180}
								guides={true}
							/>
							<div className="crop-modal-action">
								<button className="crop-modal-submit" onClick={() => this.onCrop()}>Crop ảnh</button>
								<button className="crop-modal-cancel" onClick={() => this.onCancelCrop()}>Thoát</button>
							</div>
						</div>
					</div>
				}

				{upLoadError & !onProgress ? (
					<div className="alert alert-warning">
						<p><i className="fas fa-exclamation-triangle"></i> Lỗi xảy ra khi tải tài liệu</p>
						<p>• {name}</p>
					</div>
				) : (
					<div className={duplicate ? 'upload-result-title upload-result-title-error' : 'upload-result-title'}>
						
						{!duplicate ? (
							<Fragment>
								<p>{percent}% tải lên  •  {name}</p>

								{percent !== 100 &&
								<button className="upload-cancel" onClick={() => this.cancelUpload(index)}>
									Hủy tải lên <i className="far fa-times-circle"></i>
								</button>
								}

								<div className="upload-result-percent" style={{width: percent + '%'}}></div>
							</Fragment>
						) : (
							<p>
								<i className="fas fa-exclamation-triangle"></i>
								Tài liệu "{helpers.trimFileName(duplicateFile.name)}" trùng với tài liệu đang chờ duyệt trên hệ thống, ID=>{duplicateFile.id}<br/>
								<span style={{color: 'red'}}> • {helpers.trimFileName(duplicateFile.name)}</span>
							</p>
						)}
						
						
					</div>
				)}

				{!upLoadError & !duplicate ? (
					<div className="save-all-mode">
						<div className="upload-result">
							<div className="upload-result-left">
								<img
									src={thumbnail ? thumbnail : '/lib/images/bg_changeImg.jpg'}
									alt=""
									className="img-responsive"
									onClick={this.actionChangeThumbnail}
									width={152}
									height={182}
								/>
							</div>
							<form className="upload-result-right">

								<input type="file" ref="fileUploader" className="hidden" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleChangeThumbnail}/>

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
											required
										/>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Trình độ <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control" onChange={this.handleChangeClass} required value={this.state.classes}>
											<option value={0}>Chọn trình độ cho tài liệu</option>
											{classesElem}
										</select>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Môn học <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control" required onChange={this.handleChangeSubject} value={subject}>
											<option value={0}>Chọn môn học cho tài liệu</option>
											{subjectsElem}
										</select>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Từ khóa <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<TagEditor
											tags={this.state.tags}
											tagSuggest={tagSuggest}
											onChangeTags={this.onChangeTags}
										/>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Miêu tả
									</div>
									<div className="upload-result-content-input form-group">
										<textarea
											rows="5" className="form-control" onChange={this.handleChangeDescription}
										>{description}</textarea>
									</div>
								</div>

								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Chọn giá bán <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control" onChange={this.handleCustomPrice}>
											<option value="0">Miễn phí</option>
											<option value="1">Tự đặt giá</option>
										</select>

										{customPrice &&
										<input
											type="number"
											className="form-control manual-price"
											required
											value={price}
											onChange={this.handleChangePrice}
										/>
										}
									</div>
								</div>

								{customPrice &&
								<div className="upload-result-content">
									<div className="upload-result-content-title">
										Số trang xem trước <span className="upload-result-content-required">(*)</span>
									</div>
									<div className="upload-result-content-input form-group">
										<select className="form-control" value={customPagePreview} onChange={this.handleChangeCustomPagePreview}>
											<option value={0}>Tự chọn</option>
											<option value={1}>20%</option>
											<option value={2}>50%</option>
										</select>

										{customPagePreview === 0 &&
										<Fragment>
											<input
												type="number"
												className="form-control manual-price"
												min={1}
												max={totalPage}
											/>
											<span style={{color: 'red'}}>Tài liệu có: {totalPage} trang</span>
										</Fragment>

										}
									</div>
								</div>
								}

								<hr/>

								<div className="upload-result-submit text-right">
									<button type="submit">Lưu</button>
								</div>
							</form>
						</div>
					</div>
				) : (
					<Fragment></Fragment>
				)}
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