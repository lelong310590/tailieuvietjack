import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class Pagination extends Component {

	constructor(props) {
		super(props);
		this.state = {
			current_page: 0,
			first_page_url: '',
			last_page: 0,
			last_page_url: '',
			next_page_url: '',
			prev_page_url: '',
			url: '',
			onsort: ''
		}
	}

	componentDidMount() {
		let {
			current_page, first_page_url, last_page, last_page_url,
			next_page_url, prev_page_url, url, onsort
		} = this.props;

		this.setState({
			current_page, first_page_url, last_page, last_page_url,
			next_page_url, prev_page_url, url, onsort
		})
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props !== nextProps) {
			this.setState({
				current_page: nextProps.current_page,
				last_page: nextProps.last_page
			});
		}
		return this.props === nextProps;
	};

	clickPage = (onsort, page) => {
		this.props.clickPage(onsort, page)
	};

	render() {
		let {
			current_page, first_page_url, last_page, last_page_url,
			next_page_url, prev_page_url, url, onsort
		} = this.state;

		let leftPage = current_page - 1;
		let rightPage = current_page + 1;

		// console.log('Current: ', current_page);
		// console.log('LeftPage: ', leftPage);
		// console.log('RightPage: ', rightPage);

		console.log(rightPage === last_page);

		return (
			<div className="document-manager-pagination text-center">
				<ul className="pagination">
					{current_page > 1 &&
						<li><Link to={{ pathname: url, search: 'onsort=' + onsort + '&page=' + 1}} onClick={() => this.clickPage(onsort, 1)}>1</Link></li>
					}

					{current_page - 1 >= 3 &&
						<li><span>...</span></li>
					}

					{leftPage > 1 &&
						<li><Link to={{ pathname: url, search: 'onsort=' + onsort + '&page=' + leftPage}} onClick={() => this.clickPage(onsort, leftPage)}>{leftPage}</Link></li>
					}

					<li className={'active'}><Link to={{ pathname: url, search: 'onsort=' + onsort + '&page=' + current_page}} onClick={() => this.clickPage(onsort, current_page)}>{current_page}</Link></li>

					{current_page !== last_page &&
						<li><Link to={{ pathname: url, search: 'onsort=' + onsort + '&page=' + rightPage}} onClick={() => this.clickPage(onsort, rightPage)}>{rightPage}</Link></li>
					}

					{last_page - current_page >= 3 &&
						<li><span>...</span></li>
					}

					{rightPage < last_page &&
						<li><Link to={{ pathname: url, search: 'onsort=' + onsort + '&page=' + last_page}} onClick={() => this.clickPage(onsort, last_page)}>{last_page}</Link></li>
					}
				</ul>
			</div>
		);
	}
}

export default Pagination;