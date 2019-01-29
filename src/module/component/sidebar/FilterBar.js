import React, {Component} from 'react';

class FilterBar extends Component {
	render() {
		return (
			<div className="widget filter-box-wrapper filter-bar-wrapper">
				<div className="widget-title"><h4 className="text-center">Tìm kiếm tài liệu</h4></div>
				<div className="widget-content">
					<div className="filter-bar-wrapper-inner">
						<form>

							<div className="form-group">
								<input type="text" className="form-control" value="" title="" placeholder="Tìm theo từ khóa .." />
							</div>

							<div className="form-group">
								<select name="name" className="form-control">
									<option value=""> -- Chọn loại tài liệu --</option>
								</select>
							</div>

							<div className="form-group">
								<select name="name" className="form-control">
									<option value=""> -- Chọn lớp --</option>
								</select>
							</div>

							<div className="form-group">
								<select name="name" className="form-control">
									<option value=""> -- Chọn chuyên đề --</option>
								</select>
							</div>

							<div className="form-group">
								<select name="name" className="form-control">
									<option value=""> -- Chọn định dạng --</option>
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

export default FilterBar;