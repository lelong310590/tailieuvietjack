import React, {Component} from 'react';

class FilterList extends Component {
	render() {
		return (
			<div className="doc-filter-bar">
				<div className="filter-bar-group">
					<select name="name" className="form-control">
						<option value=""> -- Giá từ thấp đến cao --</option>
						<option value=""> -- Giá từ cao đến thấp --</option>
					</select>
				</div>

				<div className="filter-bar-submit">
					<button><i className="fas fa-filter"></i> Sắp xếp</button>
				</div>
			</div>
		);
	}
}

export default FilterList;