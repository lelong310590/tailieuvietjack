import React, {Component, Fragment} from 'react';
import _ from 'lodash';

class TagEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			tagSuggest: [],
			input: ''
		}
	}

	componentWillMount = () => {
		let {tagSuggest} = this.props;
		this.setState({tagSuggest})
	};

	selectSuggestTags = (tag) => {
		let {tags, tagSuggest} = this.state;
		tags.push(tag);
		_.remove(tagSuggest, (t) => {
			return t.id === tag.id
		});
		this.setState({tags});
	};

	handleInputChange = (event) => {
		let input = event.target.value;
		this.setState({input});

	};

	handleKeyPress = (event) => {
		let {input, tags} = this.state;
		if (event.key === ',') {
			tags.push({name: input.slice(0, -1)});
			this.props.onChangeTags(input.slice(0, -1));
			input = '';
			this.setState({input, tags});
		}
	};

	render() {

		let {tagSuggest, tags, input} = this.state;

		return (
			<Fragment>
				<div className="tag-wrapper">
					{tags.length > 0 &&
						<ul className="tag-selected">
							{_.map(tags, (t, idx) => {
								return (
									<li className="tag-items" key={idx}>
										{t.name} <span className="tag-items-close">x</span>
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
				</div>

				{tagSuggest.length > 0 &&
					<div className="tag-suggest">
						<p>Từ khóa gựi ý:</p>
						<ul>
							{_.map(tagSuggest, (tag, idx) => {
								return (
									<li key={idx} onClick={() => this.selectSuggestTags(tag)}>{tag.name}</li>
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