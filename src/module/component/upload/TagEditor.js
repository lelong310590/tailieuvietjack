import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import axios from 'axios';
import * as api from './../../const/Api';

class TagEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			tagSuggest: [],
			input: '',
			tagAutocompleteList: [],
			messError: ''
		}
	}

	componentDidMount = () => {
		let {tagSuggest, tags} = this.props;
		this.setState({tagSuggest, tags})
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.tags !== nextProps.tags) {
			this.setState({
				tags: nextProps.tags
			})
		};

		if (this.props.tagSuggest !== nextProps.tagSuggest) {
			console.log(nextProps.tagSuggest);
			this.setState({
				tagSuggest: nextProps.tagSuggest
			})
		}

		return true;
	};

	selectSuggestTags = (tag) => {

		let {tags, tagSuggest} = this.state;

		let checkAvaiable = _.findIndex(tags, (t) => {
			return t.id === tag.id;
		});

		if (checkAvaiable < 0) {
			_.remove(tagSuggest, (t) => {
				return t.id === tag.id
			});

			this.setState({tagSuggest});

			this.props.onChangeTags(tag);
		}
	};

	handleInputChange = (event) => {
		let input = event.target.value;
		let {tags} = this.state;
		let exclude = [];

		_.map(tags, (t, i) => {
			exclude.push(t.id);
		});

		if (input.length > 4 && input.length < 10) {
			let token = localStorage.getItem('accessToken');
			let config = {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data',
					Authorization: token
				},
			};
			let formData = new FormData();
			formData.append('keyword', input);
			formData.append('exclude', exclude);
			axios.post(api.API_GET_AUTOCOMPLETE_TAG, formData, config)
				.then(response => {
					let tagAutocompleteList = response.data;
					this.setState({tagAutocompleteList})
				})
				.catch(err => {
					console.log(err)
				})
		}

		this.setState({input});

	};

	selectAutocompleteTag = (event, tag) => {
		let {input, tags, tagAutocompleteList} = this.state;

		let checkAvaiable = _.findIndex(tags, (t) => {
			return t.id === tag.id;
		});

		if (checkAvaiable < 0) {
			tags.push(tag);
			input = ''; //reset
			tagAutocompleteList = []; //reset
			this.setState({
				tags, input, tagAutocompleteList
			})
		}
	};

	handleKeyPress = (event) => {
		let {value} = event.target;
		let {tags} = this.state;
		if (event.key === ',') {
			if (tags.length === 6) {
				this.setState({
					messError: 'Chỉ được phép thêm tối đa là 6 từ khóa',
					input: ''
				});
			} else {
				this.props.onChangeTags({name: value.slice(0, -1)});
				this.setState({input: '', messError: ''});
			}
		}
	};

	removeTag = (event, tag) => {
		let {tagSuggest, tags} = this.state;
		_.remove(tags, (t) => {
			return t === tag
		});
		tagSuggest.push(tag);
		this.setState({tagSuggest, tags})
	};

	render() {

		let {tagSuggest, tags, input, tagAutocompleteList, messError} = this.state;

		return (
			<Fragment>

				{messError !== '' &&
					<div className="alert alert-warning">
						{messError}
					</div>
				}
				<div className="tag-wrapper">
					{tags.length > 0 &&
						<ul className="tag-selected">
							{_.map(tags, (t, idx) => {
								return (
									<li className="tag-items" key={idx}>
										{t.name}
										<span className="tag-items-close" onClick={(event) => this.removeTag(event, t)}>x</span>
									</li>
								)
							})}
						</ul>
					}

					<input
						type="text"
						className="tag-input"
						value={input}
						onChange={this.handleInputChange}
						onKeyUp={this.handleKeyPress}
					/>

					{tagAutocompleteList.length > 0 &&
						<div className="tag-autocompelte-list">
							<ul>
								{_.map(tagAutocompleteList, (tag, index) => {
									return (
										<li key={index} onClick={(event) => this.selectAutocompleteTag(event, tag)}>{tag.name}</li>
									)
								})}
							</ul>
						</div>
					}
				</div>

				{!_.isEmpty(tagSuggest)  &&
					<div className="tag-suggest">
						<p>Từ khóa gựi ý:</p>
						<ul>
							{_.map(tagSuggest, (tag, idx) => {
								return (
									<li key={idx} onClick={() => this.selectSuggestTags(tag)}>+ {tag.name}</li>
								)
							})}
						</ul>
					</div>
				}
			</Fragment>

		);
	}
}

export default TagEditor;