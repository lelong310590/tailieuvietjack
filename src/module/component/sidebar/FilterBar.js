import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import Loading from "../support/Loading";
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';

class FilterBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			classes: [],
			docTypes: [],
			subjects: [],
			chapters: [],
			keywords: '',
			format: [],
			selectedDocTypes: 0,
			selectedClasses: 0,
			selectedSubject: 0,
			selectedFormat: 0,
			selectedPrice: -1,
			selectedChapter: 0,
			loading: false,
			alert: false,
			currentDoctype:0,
			currentSubject:0,
			currentClass:0,
		}
	};

	componentDidMount = () => {

		let {params} = this.props.match;
		const search = this.props.location.search;
		let value = queryString.parse(search);
		let {
			selectedDocTypes, selectedClasses, selectedSubject, selectedFormat, selectedPrice, selectedChapter,
			keywords
		} = this.state;
		let {currentDoctype, currentSubject, currentClass} = this.props;
		this.setState({
			currentDoctype, currentSubject, currentClass,
		})
		if (_.has(params, 'code')) {
			let str = params.code.split('&')[0];

			selectedDocTypes = str.substring(
				str.indexOf("d") + 1,
				str.indexOf("s")
			);

			selectedSubject = str.substring(
				str.indexOf("s") + 1,
				str.indexOf("c")
			);

			selectedClasses = str.substring(
				str.indexOf("c") + 1,
				str.indexOf("t")
			);

			selectedChapter = str.substr(
				str.indexOf("t") + 1,1
			);
			this.setState({
				selectedDocTypes, selectedSubject, selectedClasses, selectedChapter
			})
		}

		if (_.has(value, 'price')) {
			this.setState({
				selectedPrice: value.price,
			})
		}

		if (_.has(value, 'format')) {
			this.setState({
				selectedFormat: value.format,
			})
		}
		if (_.has(value, 'keyword')) {
			this.setState({
				keywords: value.keyword,
			})
		}
		this.props.getFilterBarClass();
		this.props.getDocType();
		this.props.getSubjects();

		//this.props.getResult(keywords, selectedDocTypes, selectedClasses, selectedSubject, selectedChapter, selectedFormat, selectedPrice);
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if(this.props.currentClass!==nextProps.currentClass){
			this.setState({
				selectedClasses: nextProps.currentClass
			});
		}
		if(this.props.currentSubject!==nextProps.currentSubject){
			this.setState({
				selectedSubject: nextProps.currentSubject
			});
		}
		if(this.props.currentDoctype!==nextProps.currentDoctype){
			this.setState({
				selectedDocTypes: nextProps.currentDoctype
			});
		}
		if (this.props.FilterBarReducer.classes !== nextProps.FilterBarReducer.classes) {
			this.setState({
				classes: nextProps.FilterBarReducer.classes
			})
		}

		if (this.props.FilterBarReducer.docTypes !== nextProps.FilterBarReducer.docTypes) {
			this.setState({
				docTypes: nextProps.FilterBarReducer.docTypes
			})
		}

		if (this.props.FilterBarReducer.subjects !== nextProps.FilterBarReducer.subjects) {
			this.setState({
				subjects: nextProps.FilterBarReducer.subjects
			})
		}

		if (this.props.match.params !== nextProps.match.params) {
			let {params} = nextProps.match;

			if (_.has(params, 'code')) {
				let str = params.code.split('&')[0];
				let selectedDocTypes = str.substring(
					str.indexOf("d") + 1,
					str.indexOf("s")
				);

				let selectedSubject = str.substring(
					str.indexOf("s") + 1,
					str.indexOf("c")
				);

				let selectedClasses = str.substring(
					str.indexOf("c") + 1,
					str.indexOf("t")
				);

				let selectedChapter = str.substr(
					str.indexOf("t") + 1,1
				);

				this.setState({
					selectedDocTypes, selectedSubject, selectedClasses, selectedChapter
				})
			}
		}

		if (this.props.location.search!== nextProps.location.search) {
			let oldSearch = this.props.location.search;
			let oldValue = queryString.parse(oldSearch);

			let search = nextProps.location.search;
			let value = queryString.parse(search);

			if (_.has(value, 'price')) {
				this.setState({
					selectedPrice: value.price
				})
			}else{
				this.setState({
					selectedPrice: 0
				})
			}

			if (_.has(value, 'format')) {
				this.setState({
					selectedFormat: value.format
				})
			}else{
				this.setState({
					selectedFormat: 0
				})
			}
		}

		// if (this.props.FilterBarReducer.keywords !== nextProps.FilterBarReducer.keywords) {
		// 	this.setState({
		// 		keywords: nextProps.FilterBarReducer.keywords
		// 	})
		// }

		if (this.props.FilterBarReducer.chapters !== nextProps.FilterBarReducer.chapters) {
			this.setState({
				chapters: nextProps.FilterBarReducer.chapters
			})
		}

		return true;
	};

	submitSearch = (e) => {
		e.preventDefault();
		let {
			classes, docTypes, subjects, selectedDocTypes, selectedClasses, selectedSubject, selectedFormat, selectedPrice, selectedChapter,
			keywords, chapters,format
		} = this.state;


		let docTypeParam = '';
		let priceParam = '';
		let classesParam = '&class=';
		let subjectParam = '&subject=';
		let chapterParam = '&chapter=';
		let keywordParam = '';
		let formatParam = '';

		let docTypeSlug = '';
		let classesSlug = '';
		let subjectSlug = '';
		let chapterSlug = '';
		if (keywords != '') {
			keywordParam = '?keyword='+keywords;
		}
		let urlParams = new URLSearchParams(window.location.search);
		if(urlParams.has('keyword')){

		}
		if (selectedDocTypes !== 0) {
			docTypeParam =  + selectedDocTypes;
			let idx = _.findIndex(docTypes, (obj) => {
				return obj.id == selectedDocTypes;
			});

			if (selectedClasses !== 0 || selectedSubject !== 0) {
				if (idx >= 0) {
					docTypeSlug = docTypes[idx].slug;
				}
			}

			if (selectedClasses === 0 && selectedSubject === 0) {
				if (idx >= 0) {
					docTypeSlug = docTypes[idx].slug;
				}
			}
		}

		if (selectedFormat !== 0) {
			formatParam = '&format=' + selectedFormat
		}

		if (selectedClasses !== 0) {
			classesParam = '&class=' + selectedClasses;
			let idx = _.findIndex(classes, (obj) => {
				return obj.id == selectedClasses
			});
			if (idx >= 0) {
				classesSlug = classes[idx].slug;
			}
		}

		if (selectedSubject !== 0) {
			subjectParam = '&subject=' + selectedSubject
			let idx = _.findIndex(subjects, (obj) => {
				return obj.id == selectedSubject;
			});
			if (idx >= 0) {
				subjectSlug = subjects[idx].slug;
			}

			if (selectedDocTypes !== 0) {
				if (idx >= 0) {
					subjectSlug =  subjects[idx].slug;
				}
			}

			if (selectedDocTypes !== 0 && selectedClasses !== 0) {
				if (idx >= 0) {
					subjectSlug =  subjects[idx].slug;
				}
			}
		}

		if(docTypeSlug!=''){
			docTypeSlug+='-';
		}
		if(subjectSlug!=''&&classesSlug!=''){
			subjectSlug+='-';
		}
		let slug = docTypeSlug + subjectSlug + classesSlug;

		if (selectedChapter != 0) {
			//chapterParam = '&chapter=' + selectedChapter;
			let idx = _.findIndex(chapters, (obj) => {
				return obj.id === selectedChapter;
			});
			if (idx >= 0) {
				chapterSlug = chapters[idx].slug;
			}
			slug = chapterSlug;
		}

		if (selectedPrice !== 0) {
			priceParam = '&price=' + selectedPrice
			if(selectedPrice==-1){
				priceParam = '';
			}
		}else{
			priceParam = '&price=0';
		}

		// if (selectedChapter !== 0) {
		// 	this.props.history.push('/search/?tailieu=' + docTypeParam + chapterParam +  subjectParam + classesParam)
		// } else {
		this.props.handleChangeDocType(selectedDocTypes);
		this.props.handleChangeClasses(selectedClasses);
		this.props.handleChangeSubject(selectedSubject);
		this.props.handleChangeFormat(selectedFormat);
		this.props.handleChangePrice(selectedPrice);
		this.props.handleChangeKeyword(keywords);
		this.props.handleChangeChapter(selectedChapter);
		this.props.getResult(keywords, selectedDocTypes, selectedClasses, selectedSubject, selectedChapter, selectedFormat, selectedPrice);

		if (selectedChapter != 0) {
			this.props.history.push({
				pathname: '/' + chapterSlug +'/d' + selectedDocTypes + 's' + selectedSubject + 'c' + selectedClasses + 't' + selectedChapter + keywordParam + priceParam  + formatParam
			});

			return;
		}
		if(slug.length===0){
			slug = 'tim-kiem';
		}
		this.props.history.push({
			pathname: '/' + slug +'/d' + selectedDocTypes + 's' + selectedSubject + 'c' + selectedClasses + 't' + selectedChapter + keywordParam + priceParam  + formatParam
		});

		//this.props.history.push('/' + slug +'/?tailieu=' + docTypeParam + keywordParam + formatParam + chapterParam + subjectParam + classesParam + priceParam)
		// }

		// if (selectedDocTypes === 0 && selectedClasses === 0 && selectedSubject === 0) {
		// 	this.props.history.push('/search/?tailieu=cac-tai-lieu' + priceSlug)
		// }
	};

	handleChangeDocTypes = (event) => {
		let selectedDocTypes = parseInt(event.target.value);
		//this.props.handleChangeDocType(selectedDocTypes);
		this.setState({selectedDocTypes})
	};

	handleChangeClasses = (event) => {
		let {selectedSubject} = this.state;
		let selectedClasses = parseInt(event.target.value);
		//this.props.handleChangeClasses(selectedClasses);
		this.props.getFilterBarChapter(selectedClasses, selectedSubject);
		this.setState({
			selectedClasses,
			loading: true
		});

		setTimeout(() => {
			this.setState({loading: false})
		}, 1500)
	};

	handleChangeSubject = (event) => {
		let {selectedClasses} = this.state;
		let selectedSubject = parseInt(event.target.value);
		//this.props.handleChangeSubject(selectedSubject);
		this.props.getFilterBarChapter(selectedClasses, selectedSubject);
		this.setState({
			//selectedClasses,
			selectedSubject
		});

	};

	handleChangeFormat = (event) => {
		let selectedFormat = parseInt(event.target.value);
		//this.props.handleChangeFormat(selectedFormat);
		this.setState({selectedFormat})
	};

	handleChangePrice = (event) => {
		let selectedPrice = parseInt(event.target.value);
		//this.props.handleChangePrice(selectedPrice);
		this.setState({selectedPrice})
	};

	handleChangeKeyword = (event) => {
		let keywords = event.target.value;
		//this.props.handleChangeKeyword(keywords);
		this.setState({keywords})
	};

	handleChangeChapter = (event) => {
		let selectedChapter = parseInt(event.target.value);
		//this.props.handleChangeChapter(selectedChapter);
		this.setState({selectedChapter})
	};

	render() {

		let {
			classes, docTypes, subjects, selectedDocTypes, selectedClasses, selectedSubject, selectedFormat, selectedPrice, selectedChapter,
			keywords, chapters, loading, alert
		} = this.state;

		return (
			<div className="sidebar">
				<div className="vj-widgets">
					<h4>Tìm kiếm tài liệu</h4>
					<div className="widget-content">
						<div className="filter-bar-wrapper-inner">
							<form onSubmit={this.submitSearch}>
								{alert &&
									<div className="alert alert-danger">
										Bạn chưa chọn tiêu chí để tìm tài liệu
									</div>
								}
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Tìm theo từ khóa .." value={keywords} onChange={this.handleChangeKeyword}/>
								</div>
								<div className="form-group">
									<select name="name" className="form-control" onChange={this.handleChangeDocTypes} value={selectedDocTypes}>
										<option value={0}> -- Chọn loại tài liệu --</option>
										{_.map(docTypes, (value, idx) => {
											return (
												<option value={value.id} key={idx}>{value.name}</option>
											)
										})}
									</select>
								</div>
								<div className="form-group">
									<select name="name" className="form-control" onChange={this.handleChangeClasses} value={selectedClasses}>
										<option value={0}> -- Chọn lớp --</option>
										{_.map(classes, (value, idx) => {

											let elem = (value.id > 0) ? ` + ${value.name}` : value.name;

											return (
												<option value={value.id} key={idx}>
													{elem}
												</option>
											)
										})}
									</select>
								</div>
								<div className="form-group">
									<select name="name" className="form-control" onChange={this.handleChangeSubject} value={selectedSubject}>
										<option value={0}> -- Chọn môn --</option>
										{_.map(subjects, (value, idx) => {
											return (
												<option value={value.id} key={idx}>{value.name}</option>
											)
										})}
									</select>
								</div>
								<div className="form-group">
									<select name="name" className="form-control" value={selectedChapter} onChange={this.handleChangeChapter}>
										<option value={0}> -- Chọn chuyên đề --</option>
										{_.map(chapters, (value, idx) => {
											return (
												<option value={value.id} key={idx}>{value.name}</option>
											)
										})}
									</select>
								</div>
								<div className="form-group">
									<select name="name" className="form-control" onChange={this.handleChangeFormat} value={selectedFormat}>
										<option value={0}> -- Chọn định dạng --</option>
										<option value={1}>DOCX</option>
										<option value={2}>PDF</option>
									</select>
								</div>
								<div className="form-group">
									<select name="name" className="form-control" onChange={this.handleChangePrice} value={selectedPrice}>
										<option value={-1}>Tất cả tài liệu</option>
										<option value={0}>Tài liệu miễn phí</option>
										<option value={1}>Tài liệu có phí</option>
									</select>
								</div>
								<button type="submit" className="btn vj-btn center-block">
									Tìm kiếm &nbsp;<i className="far fa-search"></i>
								</button>
							</form>
						</div>
					</div>
				</div>
				<div className="filterOther">
					<div className="vj-widgets col-2">
						<h4>Theo lop</h4>
						<ul>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
							<li><label className="vj-checkbox"><input type="checkbox" /><span>Lớp 12</span></label></li>
						</ul>
					</div>
					<div className="vj-widgets">
						<h4>Theo mon</h4>
						<ul>
							<li><a>Mon Toan</a></li>
							<li><a>Mon Ly</a></li>
							<li><a>Mon hoa</a></li>
							<li><a>Mon van</a></li>
							<li><a>Mon anh van</a></li>
							<li><a>Mon sinh</a></li>
							<li>
								<a>Cac mon khac <i className="fal fa-angle-right"></i></a>
								<ul>
									<li><a href="#">Mon su</a></li>
									<li><a href="#">Mon dia</a></li>
									<li><a href="#">Mon tin hoc</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<div className="vj-widgets">
						<h4>Theo loai</h4>
						<ul>
							<li><a>Bai giang</a></li>
							<li><a>Chuyen de</a></li>
							<li><a>De thi</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		getFilterBarClass: () => {
			dispatch(action.getFilterBarClass())
		},

		getDocType: () => {
			dispatch(action.getDocType())
		},

		getSubjects: () => {
			dispatch(action.getSubjects())
		},

		handleChangeClasses: (data) => {
			dispatch(action.handleChangeClasses(data))
		},

		handleChangeDocType: (data) => {
			dispatch(action.handleChangeDocType(data))
		},

		handleChangeSubject: (data) => {
			dispatch(action.handleChangeSubject(data))
		},

		handleChangeFormat: (data) => {
			dispatch(action.handleChangeFormat(data))
		},

		handleChangePrice: (data) => {
			dispatch(action.handleChangePrice(data))
		},

		handleChangeKeyword: (data) => {
			dispatch(action.handleChangeKeyword(data))
		},

		handleChangeChapter: (data) => {
			dispatch(action.handleChangeChapter(data))
		},

		getFilterBarChapter: (classId, subjectId) => {
			dispatch(action.getFilterBarChapter(classId, subjectId))
		},

		getResult: (keyword = null, docTypeId = null, classesId = null, subjectId = null, chapterId = null, formatId = null, price = null, page = 1) => {
			dispatch(action.getResult(keyword, docTypeId, classesId, subjectId, chapterId, formatId, price, page));
		}
	}
};

export default withRouter (connect(mapStateToProps, mapDispatchToProps) (FilterBar));