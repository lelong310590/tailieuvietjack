import React, {Component} from 'react';

class DocSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			keyword: ''
		}
	}

	handleChangeKeyword = (event) => {
		let keyword = event.target.value;
		this.setState({keyword})
	};

	submitSearch = (event) => {
		event.preventDefault();
		let {keyword} = this.state;
		this.props.search(keyword);
	};

	render() {

		let {keyword} = this.state;

		return (
			<div className="document-filter-search">
				<form onSubmit={this.submitSearch}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							placeholder="Tìm kiếm..."
							value={keyword}
							onChange={this.handleChangeKeyword}
						/>
						<button type="submit"><i className="fas fa-search"></i></button>
					</div>
				</form>
			</div>
		);
	}
}

export default DocSearch;