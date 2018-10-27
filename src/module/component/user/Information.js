import React, {Component} from 'react';
import UserCover from "./UserCover";
import Menu from "./Menu";
import DatePicker from 'react-date-picker';
import {connect} from 'react-redux';
import * as actions from './../../action/Index';
import { withRouter } from "react-router";
import Meta from "../support/Meta";


class Information extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			firstName: '',
			lastName: '',
			email: '',
			thumbnail: '',
			birth: new Date(2017, 0, 1),
			docCount: 0,
			docDownload: 0,
			address: '',
			gender: 0,
			profit: 0,
			totalMoney: 0
		}
	}

	componentWillMount = () => {
		let {id, firstName, lastName, email, thumbnail, address, gender} = this.props.UserReducer;
		this.setState({
			id, firstName, lastName, email, thumbnail, address, gender
		})
	};

	onHandleChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		this.setState({
			[name]: value
		})
	};

	onHandleSubmit = (event) => {
		event.preventDefault();

	};

	render() {

		let {firstName, lastName, birth, gender, address, email} = this.state;

		return (
			<section className="user-wrapper">

				<Meta
					title={firstName}
				/>

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
									<h1 className="user-main-setting-title">Thông tin cá nhân</h1>
									<div className="user-main-setting-content">
										<form className="info-user-cnt" onSubmit={this.onHandleSubmit}>
											<div className="form-group">
												<label>Họ và tên đệm</label>
												<input
													type="text"
													name="firstName"
													value={firstName}
													className="form-control"
													onChange={this.onHandleChange}
												/>
											</div>

											<div className="form-group">
												<label>Tên</label>
												<input
													type="text"
													name="lastName"
													value={lastName}
													className="form-control"
													onChange={this.onHandleChange}
												/>
											</div>

											<div className="form-group">
												<label>Ngày sinh</label>
												<DatePicker
													handleChangeBirth={this.onHandleChange}
													value={birth}
													name="birth"
												/>
											</div>

											<div className="form-group">
												<label>Giới tính</label>
												<select
													className="form-control"
													onChange={this.onHandleChange}
													value={gender}
													name="gender"
												>
													<option value={0}>Khác</option>
													<option value={1}>Nam</option>
													<option value={2}>Nữ</option>
												</select>
											</div>

											<div className="form-group">
												<label>Địa chỉ</label>
												<input
													type="text"
													name="address"
													value={address}
													className="form-control"
													onChange={this.onHandleChange}
												/>
											</div>

											<div className="form-group">
												<label>Email:</label>
												<input
													type="text"
													name="address"
													value={email}
													className="form-control"
													readOnly
												/>
											</div>

											<div className="user-setting-button text-right">
												<button type="submit">Sửa thông tin</button>
											</div>
										</form>
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

const mapStateToProps = (state) => {
	return state;
};

export default withRouter(connect(mapStateToProps, null) (Information));