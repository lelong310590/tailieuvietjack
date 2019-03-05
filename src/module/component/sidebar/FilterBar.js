import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as action from './../../action/Index';
import Loading from "../support/Loading";
import queryString from 'query-string';

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
			selectedPrice: 0,
			selectedChapter: 0,
			loading: false,
			alert: false
		}
	};

	componentDidMount = () => {
		const search = this.props.location.search;
		let value = queryString.parse(search);
		let {
			selectedDocTypes, selectedClasses, selectedSubject, selectedFormat, selectedPrice, selectedChapter,
			keywords
		} = this.state;

		if (_.has(value, 'class')) {
			this.setState({
				selectedClasses: value.class,
			})
		}
		if (_.has(value, 'price')) {
			this.setState({
				selectedPrice: value.price,
			})
		}
		if (_.has(value, 'subject')) {
			this.setState({
				selectedSubject: value.subject,
			})
		}
		if (_.has(value, 'tailieu')) {
			this.setState({
				selectedDocTypes: value.tailieu,
			})
		}

		this.props.getFilterBarClass();
		this.props.getDocType();
		this.props.getSubjects();

		//this.props.getResult(keywords, selectedDocTypes, selectedClasses, selectedSubject, selectedChapter, selectedFormat, selectedPrice);
	};

	shouldComponentUpdate = (nextProps, nextState) => {

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
		console.log('cu ',this.props.location.search);
		console.log('moi ',nextProps.location.search);
		if (this.props.location.search!== nextProps.location.search) {
			let oldSearch = this.props.location.search;
			let oldValue = queryString.parse(oldSearch);

			let search = nextProps.location.search;
			let value = queryString.parse(search);
			console.log(value.class);
			this.setState({
				selectedClasses: value.class
			})
			this.setState({
				selectedDocTypes: value.tailieu
			})
			this.setState({
				selectedSubject: value.subject
			})
			this.setState({
				selectedFormat: value.format
			})
			this.setState({
				selectedPrice: value.price
			})
			this.setState({
				selectedChapter: value.chapter
			})
		}

		if (this.props.FilterBarReducer.keywords !== nextProps.FilterBarReducer.keywords) {
			this.setState({
				keywords: nextProps.FilterBarReducer.keywords
			})
		}

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

		this.props.getResult(keywords, selectedDocTypes, selectedClasses, selectedSubject, selectedChapter, selectedFormat, selectedPrice);

		let docTypeSlug = '';
		let priceSlug = selectedPrice === 0 ? '&price=mien-phi' : '&price=co-phi';
		let classesSlug = '&class=';
		let subjectSlug = '&subject=';
		let chapterSlug = '&chapter=';
		let keywordSlug = '&keyword=';
		let formatSlug = '&format=';
		if(selectedPrice === 0){
			priceSlug =  '&price=mien-phi';
		}else if(selectedPrice === -1){
			priceSlug =  '&price=tat-ca';
		}else{
			priceSlug =  '&price=co-phi';
		}

		if(keywords!=''){
			keywordSlug = '&keyword='+keywords;
		}

		if (selectedDocTypes !== 0) {
			docTypeSlug =  + selectedDocTypes
		}

		if (selectedFormat !== 0) {
			formatSlug = '&format=' + selectedFormat
		}

		if (selectedClasses !== 0) {
			classesSlug = '&class=' + selectedClasses
		}

		if (selectedSubject !== 0) {

			subjectSlug = '&subject=' + selectedSubject
		}

		if (selectedChapter !== 0) {
			chapterSlug = '&chapter=' + selectedChapter
		}

		// if (selectedChapter !== 0) {
		// 	this.props.history.push('/search/?tailieu=' + docTypeSlug + chapterSlug +  subjectSlug + classesSlug)
		// } else {
			this.props.history.push('/search/?tailieu=' + docTypeSlug + keywordSlug + formatSlug + chapterSlug + subjectSlug + classesSlug + priceSlug)
		// }

		// if (selectedDocTypes === 0 && selectedClasses === 0 && selectedSubject === 0) {
		// 	this.props.history.push('/search/?tailieu=cac-tai-lieu' + priceSlug)
		// }
	};

	handleChangeDocTypes = (event) => {
		let selectedDocTypes = parseInt(event.target.value);
		this.props.handleChangeDocType(selectedDocTypes);
		this.setState({selectedDocTypes})
	};

	handleChangeClasses = (event) => {
		let {selectedSubject} = this.state;
		let selectedClasses = parseInt(event.target.value);
		this.props.handleChangeClasses(selectedClasses);
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
		this.props.handleChangeSubject(selectedSubject);
		this.props.getFilterBarChapter(selectedClasses, selectedSubject);
		this.setState({
			selectedClasses,
			loading: true
		});

		setTimeout(() => {
			this.setState({loading: false})
		}, 1500)
	};

	handleChangeFormat = (event) => {
		let selectedFormat = parseInt(event.target.value);
		this.props.handleChangeFormat(selectedFormat);
		this.setState({selectedFormat})
	};

	handleChangePrice = (event) => {
		let selectedPrice = parseInt(event.target.value);
		this.props.handleChangePrice(selectedPrice);
		this.setState({selectedPrice})
	};

	handleChangeKeyword = (event) => {
		let keyword = event.target.value;
		this.props.handleChangeKeyword(keyword);
		this.setState({keyword})
	};

	handleChangeChapter = (event) => {
		let chapter = parseInt(event.target.value);
		this.props.handleChangeChapter(chapter);
		this.setState({chapter})
	};

	render() {

		let {
			classes, docTypes, subjects, selectedDocTypes, selectedClasses, selectedSubject, selectedFormat, selectedPrice, selectedChapter,
			keywords, chapters, loading, alert
		} = this.state;

		return (
			<div className="widget filter-box-wrapper filter-bar-wrapper">
				<div className="widget-title"><h4 className="text-center">Tìm kiếm tài liệu</h4></div>
				<div className="widget-content">
					<div className="filter-bar-wrapper-inner">

						{/*{loading && <Loading/> }*/}

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
/									<option value={0}>Tài liệu miễn phí</option>
									<option value={1}>Tài liệu có phí</option>
								</select>
							</div>

							<button type="submit" className="btn btn-primary center-block">
								<i className="fas fa-search"></i> Tìm kiếm
							</button>
						</form>
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

export default connect(mapStateToProps, mapDispatchToProps) (FilterBar);