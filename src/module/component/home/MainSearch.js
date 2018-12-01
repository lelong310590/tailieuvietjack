import React, {Component} from 'react';

class MainSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			keywords: ''
		}
	}

	handleChangeKeyword = (event) => {
		let {value} = event.target;
		this.setState({
			keywords: value
		})
	};

	submitSearch = (event) => {
		event.preventDefault();
		let {keywords} = this.state;
	};

	render() {

		let {keywords} = this.state;

		return (
			<div className="main-search">
				<form onSubmit={this.submitSearch}>
					<div className="form-group">
						<input type="text" className="form-control"
						       placeholder="Tìm kiếm..."
						       value={keywords}
						       onChange={this.handleChangeKeyword}
						/>
					</div>

					<button type="submit" className="btn btn-primary">
						<i className="fas fa-search"></i>
					</button>
				</form>
			</div>
		);
	}
}

export default MainSearch;