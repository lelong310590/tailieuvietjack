import React, {Component} from 'react';
import UserCover from "./UserCover";
import Menu from "./Menu";

class DocManager extends Component {
	render() {
		return (
			<section className="user-wrapper">
				<div className="user-cover-photo"></div>

				<div className="user-main-info">
					<div className="container">
						<UserCover/>
					</div>
				</div>

				<div className="user-main-wrapper">
					<div className="container">
						<div className="row">
							<Menu/>

							<div className="col-xs-12 col-md-9">
								<div className="user-main-setting-wrapper">
									<h1 className="user-main-setting-title"> Quản lý tài liệu</h1>
									<div className="document-manager-filter-bar">
										<div className="document-filter-radio">
											<div className="document-manager-filter-item">
												<label className="radio-inline">
													<input type="radio" name="optradio" />Được duyệt (0)
												</label>
											</div>
											<div className="document-manager-filter-item">
												<label className="radio-inline">
													<input type="radio" name="optradio" />Chờ duyệt (9)
												</label>
											</div>
										</div>

										<div className="document-filter-search">
											<div className="form-group">
												<input type="text" className="form-control" placeholder="Tìm kiếm..."/>
												<button type="button"><i className="fas fa-search"></i></button>
											</div>
										</div>
									</div>

									<div className="document-manager-list">
										<div className="document-manager-item">

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default DocManager;