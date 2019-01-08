import React, {Component} from 'react';
import UserCover from "./UserCover";
import Menu from "./Menu";

class FinanceManager extends Component {
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
									<h1 className="user-main-setting-title"> Quản lý tài chính</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default FinanceManager;