import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import * as helpers from './../../Support';
import _ from 'lodash';
import Cropper from 'react-cropper'; //Import Cropper Component
import 'cropperjs/dist/cropper.css';
import TagEditor from "./TagEditor";  //Import file style
import * as api from './../../const/Api';
import Loading from "../support/Loading";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';
import EditComplete from "./EditComplete";

class OnUpload extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: helpers.trimFileName(this.props.name),
			preview: null,
			customPrice: false,
			customPagePreview: 0, //0: manual - 1: 20% - 2: 50%
			tempThumbnail: null, //store file while first upload
			modalCrop: false,
			thumbnail: null, // store file after crop,
			classes: 0,
			subject: 0,
			chapter: 0,
			thematic: 0,
			description: null,
			price: 0,
			pagePreview: 1,
			upLoadError: true,
			id: 0,
			totalPage: 0,
			onProgress: true,
			duplicate: false,
			duplicateFile: {id: 0, name: null},
			tags: [],
			tagSuggest: [],
			isSubmit: false,
			errorMess: '',
			editComplete: false,

			returnClass: {id: '', name: ''},
			returnSubject: {id: '', name: ''},
			returnChapter: {id: '', name: ''},
			returnThematic: {id: '', name: ''},
			returnPrice: ''
		}
	}

	componentDidMount = () => {
		this.props.getClasses();
		this.props.getPrice();
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		let {
			upLoadError, id, totalPage, onProgress, duplicate, duplicateFile, tagSuggest
		} = nextProps;

		if (this.props.duplicate !== duplicate || this.props.duplicateFile !== duplicateFile) {
			this.setState({
				duplicate,
				duplicateFile
			});
		}

		if (this.props.upLoadError !== nextProps.upLoadError) {
			this.setState({
				upLoadError: (upLoadError === undefined) ? true : upLoadError,
				id, totalPage, onProgress, tagSuggest
			})
		}

		if (this.props.ChapterReducer !== nextProps.ChapterReducer) {

		}

		return true;
	};

	// UNSAFE_componentWillReceiveProps = (nextProps) => {
	// 	let {
	// 		percent, upLoadError, id, totalPage, onProgress, duplicate, duplicateFile, tagSuggest
	// 	} = nextProps;
	// 	//console.log(upLoadError === false);
	//
	// 	this.setState({duplicate, duplicateFile});
	//
	// 	if (percent === 100) {
	// 		this.setState({
	// 			upLoadError: (upLoadError === undefined) ? true : upLoadError,
	// 			id, totalPage, onProgress, tagSuggest
	// 		})
	// 	}
	// };

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
		this.setState({classes});
		let {subject} = this.state;
		this.props.getChapter(classes, subject);
	};

	handleChangeDocTypes = (event) => {
		let selectedDocTypes = event.target.value;
		this.setState({selectedDocTypes});
		let {classes} = this.state;
		this.props.getChapter(classes, selectedDocTypes);
	};

	handleChangeSubject = (event) => {
		let subject = event.target.value;
		this.setState({subject});
		let {classes} = this.state;
		this.props.getChapter(classes, subject);
	};

	handleChangeChapter = (event) => {
		let chapter = event.target.value;
		this.setState({chapter});
		//this.props.getThematic(chapter)
	};

	// handleChangeThematic = (event) => {
	// 	let thematic = event.target.value;
	// 	this.setState({thematic})
	// };

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

	handleChangePreview = (event) => {
		let previewfile = event.target.files;
		this.setState({
			preview: previewfile[0],
		})
	}

	actionChangeThumbnail = () => {
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
		if (value === 0) {
			this.setState({
				customPrice: false,
				price: 0
			})
		} else if (value === 1) {
			this.setState({
				customPrice: true,
				pagePreview: 1,
				price: 1
			})
		} else {
			this.setState({
				price: value,
				customPrice: false,
				pagePreview: 1
			})
		}
	};

	changePagePreview = (event) => {
		let {totalPage} = this.state;
		let pagePreview = event.target.value;
		if (pagePreview <= totalPage & pagePreview > 0) {
			this.setState({pagePreview})
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

	//Upload file
	handleEditFile = (event) => {
		event.preventDefault();
		let {email} = this.props.UserReducer;
		let {
			name, customPagePreview, thumbnail, classes, selectedDocTypes,preview,
			subject, description, price, pagePreview, id, tags, totalPage, thematic, chapter
		} = this.state;

		let errorMess = '';
		errorMess += (name.length < 5) ? '• Tên tài liệu từ 5 ký tự trở lên <br/>' : '';
		errorMess += (classes === 0) ? '• Trình độ không được bỏ trống <br/>' : '';
		errorMess += (subject === 0) ? '• Môn học không được bỏ trống <br/>' : '';
		// errorMess += (thematic === 0) ? '• Chuyên đề không được bỏ trống <br/>' : '';
		//errorMess += (chapter === 0) ? '• Chương không được bỏ trống <br/>' : '';
		//errorMess += (tags.length < 3) ? '• Tối thiểu phải có 3 từ khóa <br/>' : '';

		this.setState({errorMess});

		let formData = new FormData();
		formData.append('id', id);
		formData.append('name', name);
		formData.append('category', classes);
		formData.append('subject', subject);
		formData.append('doctype', selectedDocTypes);
		formData.append('excerpt', description);
		//formData.append('thematic', description);
		formData.append('preview', preview);
		formData.append('chapter', chapter);
		formData.append('price', price);
		formData.append('thumbnail', thumbnail);
		formData.append('tags', JSON.stringify(tags));
		formData.append('email', email);

		formData.append('custom_page_review', customPagePreview);
		formData.append('page_preview', pagePreview);
		formData.append('total_page', totalPage);

		let token = localStorage.getItem('accessToken');
		let config = {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: token
			},
		};

		if (errorMess === '') {
			this.setState({isSubmit: true});
			axios.post(api.API_UPDATE_DOC_AFTER_UPLOAD, formData, config)
				.then(response => {
					this.setState({
						editComplete: true,
						returnClass: response.data.classes,
						name: response.data.name,
						thumbnail: response.data.thumbnail,
						returnSubject: response.data.subject,
						tags: response.data.tags,
						returnPrice: response.data.price
					});
				})
				.catch(err => {
					console.log(err);
				})
				.finally(() => {
					this.setState({isSubmit: false})
				})
		}
	};

	render() {
		let {classes} = this.props.ClassesReducer;
		let {docTypes} = this.props.FilterBarReducer;
		let priceList = this.props.PriceReducer.price;
		let {listSubjectinClass} = this.props.SubjectReducer;
		let chapterList = this.props.ChapterReducer.listChapters;
		// let thematicList = this.props.ThematicReducer.thematic;
		let {percent, name, index} = this.props;
		let {
			customPrice, tempThumbnail, modalCrop, thumbnail, subject, selectedDocTypes, chapter, thematic, description, price,
			pagePreview, customPagePreview, upLoadError, totalPage, onProgress, duplicate, duplicateFile,
			tagSuggest, isSubmit, errorMess, editComplete, returnClass ,returnPrice, returnSubject
		} = this.state;

		let classesElem = _.map(classes, (value, index) => {
			return (
				<option value={value.id} key={index}>{value.name}</option>
			)
		});

		let docTypesElem = _.map(docTypes, (value, index) => {
			return (
				<option value={value.id} key={index}>{value.name}</option>
			)
		});

		let subjectsElem = _.map(listSubjectinClass, (value, index) => {
			return (
				<option value={value.id} key={index}>{value.name}</option>
			)
		});

		return (
			<Fragment>
				{editComplete ? (
					<EditComplete
						name={name}
						classes={returnClass.name}
						subject={returnSubject.name}
						price={returnPrice}
						tags={this.state.tags}
						description={description}
						thumbnail={thumbnail}
					/>
				) : (
					<div className="upload-result-wrapper">

						{isSubmit &&
						<Loading/>
						}

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
									aspectRatio={297 / 385}
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

						{errorMess !== '' &&
						<div className="alert alert-danger">
							{ReactHtmlParser(errorMess)}
						</div>
						}

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
									<form className="upload-result-right" onSubmit={this.handleEditFile}>

										<input type="file" ref="fileUploader" className="hidden" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleChangeThumbnail}/>
										<div className="upload-result-content">
											<div className="upload-result-content-title">
												Bản xem trước
											</div>
											<div className="upload-result-content-input form-group">
												<input
													type="file"
													className="form-control"
													name="review"
													onChange={this.handleChangePreview}
													accept="application/pdf,application/msword"
												/>
											</div>
										</div>
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
												Tài liệu <span className="upload-result-content-required">(*)</span>
											</div>
											<div className="upload-result-content-input form-group">
													<select className="form-control" onChange={this.handleChangeDocTypes} required value={selectedDocTypes}>
													<option value={0}>Chọn loại tài liệu</option>
													{docTypesElem}
												</select>
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
												Chương
											</div>
											<div className="upload-result-content-input form-group">
												<select className="form-control" required onChange={this.handleChangeChapter} value={chapter}>
													<option value={0}>Chọn chương cho tài liệu</option>
													{_.map(chapterList, (chap, idx) => {
														return (
															<option value={chap.id} key={idx}>{chap.name}</option>
														)
													})}
												</select>
											</div>
										</div>

										{/*<div className="upload-result-content">*/}
											{/*<div className="upload-result-content-title">*/}
												{/*Chuyên đề <span className="upload-result-content-required">(*)</span>*/}
											{/*</div>*/}
											{/*<div className="upload-result-content-input form-group">*/}
												{/*<select className="form-control" required onChange={this.handleChangeThematic} value={thematic}>*/}
													{/*<option value={0}>Chọn chuyên đề cho tài liệu</option>*/}
													{/*{_.map(thematicList, (thematic, idx) => {*/}
														{/*return (*/}
															{/*<option value={thematic.id} key={idx}>{thematic.name}</option>*/}
														{/*)*/}
													{/*})}*/}
												{/*</select>*/}
											{/*</div>*/}
										{/*</div>*/}

										{/*<div className="upload-result-content">*/}
											{/*<div className="upload-result-content-title">*/}
												{/*Từ khóa <span className="upload-result-content-required">(*)</span>*/}
											{/*</div>*/}
											{/*<div className="upload-result-content-input form-group">*/}
												{/*<TagEditor*/}
													{/*tags={this.state.tags}*/}
													{/*tagSuggest={tagSuggest}*/}
													{/*onChangeTags={this.onChangeTags}*/}
												{/*/>*/}
											{/*</div>*/}
										{/*</div>*/}

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
													{_.map(priceList, (p, i) => {
														return(
															<option value={p.moneys} key={i}>{p.name}</option>
														)
													})}
													<option value="1">Tự đặt giá</option>
												</select>

												{customPrice &&
												<Fragment>
													<input
														type="number"
														className="form-control manual-price"
														required
														value={price}
														onChange={this.handleChangePrice}
													/>
												</Fragment>
												}
											</div>
										</div>

										{price >= 1 &&
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
														value={pagePreview}
														onChange={this.changePagePreview}
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
				)}
			</Fragment>
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
			dispatch(actions.getListSubjectViaClass(classId))
		},

		getPrice: () => {
			dispatch(actions.getPrice())
		},

		getChapter: (category_id, subject_id) => {
			dispatch(actions.getListChapter(category_id, subject_id))
		},

		// getThematic: (chapter_id) => {
		// 	dispatch(actions.getThematic(chapter_id))
		// }
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (OnUpload);