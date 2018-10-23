import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Tags extends Component {
	render() {
		return (
			<div className="document-detail-tags">
				<h4>TỪ KHÓA LIÊN QUAN</h4>
				<div className="document-detail-tags-list">
					<ul>
						<li><Link to="">công thức tích phân đạo hàm</Link></li>
						<li><Link to="">công thức tích phân đạo hàm</Link></li>
						<li><Link to="">công thức tích phân đạo hàm</Link></li>
						<li><Link to="">công thức tích phân đạo hàm</Link></li>
						<li><Link to="">công thức tích phân đạo hàm</Link></li>
						<li><Link to="">công thức tích phân đạo hàm</Link></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Tags;