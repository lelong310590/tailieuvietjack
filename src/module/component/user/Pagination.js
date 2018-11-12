import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as helper from './../../Support';

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
			onsort: '',
			keyword: ''
		}
	}

	componentDidMount() {
		let {
			current_page, first_page_url, last_page, last_page_url,
			next_page_url, prev_page_url, url, onsort, keyword
		} = this.props;

		this.setState({
			current_page, first_page_url, last_page, last_page_url,
			next_page_url, prev_page_url, url, onsort, keyword
		})
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props !== nextProps) {
			this.setState({
				current_page: nextProps.current_page,
				last_page: nextProps.last_page,
				keyword: nextProps.keyword
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
			next_page_url, prev_page_url, url, onsort, keyword
		} = this.state;

		let leftPage = current_page - 1;
		let rightPage = current_page + 1;

		// console.log('Current: ', current_page);
		// console.log('LeftPage: ', leftPage);
		// console.log('RightPage: ', rightPage);

		// console.log(rightPage === last_page);

		return (
			<div className="document-manager-pagination text-center">
				<ul className="pagination">
					{current_page > 1 &&
						<li><Link to={helper.renderNavLink(url, onsort, 1, keyword)}>1</Link></li>
					}

					{current_page - 1 >= 3 &&
						<li><span>...</span></li>
					}

					{leftPage > 1 &&
						<li><Link to={helper.renderNavLink(url, onsort, leftPage, keyword)}>{leftPage}</Link></li>
					}

					<li className={'active'}><Link to={helper.renderNavLink(url, onsort, current_page, keyword)}>{current_page}</Link></li>

					{current_page !== last_page &&
						<li><Link to={helper.renderNavLink(url, onsort, rightPage, keyword)}>{rightPage}</Link></li>
					}

					{last_page - current_page >= 3 &&
						<li><span>...</span></li>
					}

					{rightPage < last_page &&
						<li><Link to={helper.renderNavLink(url, onsort, last_page, keyword)}>{last_page}</Link></li>
					}
				</ul>
			</div>
		);
	}
}

export default Pagination;