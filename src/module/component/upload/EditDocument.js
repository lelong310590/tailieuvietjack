import React, {Component, Fragment} from 'react';
import UserCover from "../user/UserCover";
import Menu from "../user/Menu";
import TagEditor from "./TagEditor";
import _ from "lodash";
import * as actions from "../../action/Index";
import {connect} from 'react-redux';
import axios from "axios";
import * as api from "../../const/Api";
import Loading from "../support/Loading";
import ReactHtmlParser from "react-html-parser";

class EditDocument extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			classes: 0,
			subject: 0,
			chapter: 0,
			thematic: 0,
			description: '',
			tagSuggest: [],
			tags: [],
			customPrice: false,
			price: 0,
			pagePreview: 1,
			customPagePreview: 0,
			errorMess: '',
			isSubmit: false,
			editComplete: false
		}
	}

	componentDidMount = () => {
		this.props.getClasses();
		this.props.getPrice();
		let {slug} = this.props.match.params;
		let token = localStorage.getItem('accessToken');
		this.props.getDocumentInfo(slug, token);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.DocReducer.doc !== nextProps.DocReducer.doc) {

			let {
				subject_id, category_id, name, price, pages, excerpt
			} = nextProps.DocReducer.doc.docInfo;

			let priceList = this.props.PriceReducer.price;

			let priceIdx = _.findIndex(priceList, (p) => {
				return p.moneys === price;
			});

			let customPrice = priceIdx < 0 ? true : false;

			let tags = nextProps.DocReducer.doc.currentTag;
			let tagSuggest = nextProps.DocReducer.doc.suggestTag;

			this.setState({
				name,
				classes: category_id ? category_id : 0,
				subject: subject_id ? subject_id : 0,
				price,
				description: excerpt,
				pagePreview: pages,
				tags, customPrice, tagSuggest
			})
		}

		return true;
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

	onChangeTags = (t) => {
		let {tags} = this.state;
		tags.push(t);
		this.setState({tags})
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

	handleChangePrice = (event) => {
		let price = event.target.value;
		this.setState({price})
	};

	handleChangeCustomPagePreview = (event) => {
		let customPagePreview = parseInt(event.target.value);
		this.setState({customPagePreview})
	};

	changePagePreview = (event) => {
		let {totalPage} = this.state;
		let pagePreview = event.target.value;
		if (pagePreview <= totalPage & pagePreview > 0) {
			this.setState({pagePreview})
		}
	};

	submit = (event) => {
		event.preventDefault();
		let {email} = this.props.UserReducer;
		let id = this.props.match.params.slug;

		let {
			name, classes, description, price, tags,
			subject, customPagePreview, pagePreview, thematic, chapter
		} = this.state;

		let errorMess = '';
		errorMess += (name.length < 5) ? '• Tên tài liệu từ 5 ký tự trở lên <br/>' : '';
		errorMess += (classes === 0) ? '• Trình độ không được bỏ trống <br/>' : '';
		errorMess += (subject === 0) ? '• Môn học không được bỏ trống <br/>' : '';
		//errorMess += (thematic === 0) ? '• Chuyên đề không được bỏ trống <br/>' : '';
		errorMess += (chapter === 0) ? '• Chương không được bỏ trống <br/>' : '';
		errorMess += (tags.length < 3) ? '• Tối thiểu phải có 3 từ khóa <br/>' : '';

		this.setState({errorMess});

		let formData = new FormData();
		formData.append('id', id);
		formData.append('name', name);
		formData.append('category', classes);
		formData.append('subject', subject);
		formData.append('thematic', description);
		formData.append('chapter', description);
		formData.append('excerpt', description);
		formData.append('price', price);
		formData.append('tags', JSON.stringify(tags));
		formData.append('email', email);

		formData.append('custom_page_review', customPagePreview);
		formData.append('page_preview', pagePreview);

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
		let {listSubjectinClass} = this.props.SubjectReducer;
		let priceList = this.props.PriceReducer.price;
		let chapterList = this.props.ChapterReducer.listChapters;
		let thematicList = this.props.ThematicReducer.thematic;

		let {
			subject, description, tagSuggest, price, customPrice, customPagePreview,
			totalPage, pagePreview, name, tags, isSubmit, errorMess, editComplete, thematic, chapter
		} = this.state;


		let classesElem = _.map(classes, (value, index) => {
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
			<section className="user-wrapper">
				<div className="user-cover-photo"></div>

				<div className="user-main-info">
					<div className="container">
						<UserCover/>
					</div>
				</div>

				<div className="user-main-wrapper">
					<div className="container">
						<div className="row">
							<Menu
								path={this.props.match.path}
							/>

							<div className="col-xs-12 col-md-9">
								<div className="user-main-setting-wrapper">
									<h1 className="user-main-setting-title"> Chỉnh sửa thông tin tài liệu</h1>
									<div className="edit-result-wrapper">

										{isSubmit &&
											<Loading/>
										}

										{errorMess !== '' &&
										<div className="alert alert-danger">
											{ReactHtmlParser(errorMess)}
										</div>
										}

										{editComplete &&
											<div className="alert alert-success">
												Tài liệu đã cập nhật thông tin thành công.
											</div>
										}


										<div className="upload-result">

											<form className="upload-result-right" onSubmit={this.submit}>
												<div className="upload-result-content">
													<div className="upload-result-content-title">
														Tên tài liệu <span className="upload-result-content-required">(*)</span>
													</div>
													<div className="upload-result-content-input form-group">
														<input
															type="text"
															className="form-control"
															name="name"
															value={name}
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
														Chương <span className="upload-result-content-required">(*)</span>
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

												<div className="upload-result-content">
													<div className="upload-result-content-title">
														Miêu tả
													</div>
													<div className="upload-result-content-input form-group">
														<textarea
															rows="5" className="form-control"
															onChange={this.handleChangeDescription}
															value={description ? description : ''}></textarea>
													</div>
												</div>

												<div className="upload-result-content">
													<div className="upload-result-content-title">
														Từ khóa <span className="upload-result-content-required">(*)</span>
													</div>
													<div className="upload-result-content-input form-group">
														<TagEditor
															tags={tags}
															tagSuggest={tagSuggest}
															onChangeTags={this.onChangeTags}
														/>
													</div>
												</div>

												<div className="upload-result-content">
													<div className="upload-result-content-title">
														Chọn giá bán <span className="upload-result-content-required">(*)</span>
													</div>
													<div className="upload-result-content-input form-group">
														<select className="form-control" onChange={this.handleCustomPrice} value={price}>
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
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

		getDocumentInfo: (id, token) => {
			dispatch(actions.getDocumentInfo(id, token))
		},

		getChapter: (category_id, subject_id) => {
			dispatch(actions.getListChapter(category_id, subject_id))
		},

		// getThematic: (chapter_id) => {
		// 	dispatch(actions.getThematic(chapter_id))
		// }
	}
};

export default connect(mapStateToProps, mapDispatchToProps) (EditDocument);