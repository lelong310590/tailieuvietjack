import React, {Component} from 'react';
import UserCover from "./UserCover";
import Menu from "./Menu";
import DatePicker from 'react-date-picker';
import {connect} from 'react-redux';
import { withRouter } from "react-router";
import Meta from "../support/Meta";
import * as action from './../../action/Index';
import Loading from "../support/Loading";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";

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
			totalMoney: 0,
			onLoading: false,
			updateSuccess: false
		}
	}

	componentDidMount = () => {
		let {id, firstName, lastName, email, thumbnail, address, gender} = this.props.UserReducer;
		this.setState({
			id, firstName, lastName, email, thumbnail, address, gender
		})
	};

	shouldComponentUpdate = (nextProps, nextState) => {
		if (this.props.UserReducer !== nextProps.UserReducer) {
			let {id, firstName, lastName, email, thumbnail, address, gender, onLoading, updateSuccess} = nextProps.UserReducer;
			this.setState({
				id, firstName, lastName, email, thumbnail, address, gender, onLoading, updateSuccess
			})
		}

		return true;
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
		let {id, firstName, lastName, gender} = this.state;

		let obj = {
			firstName: firstName,
			lastName: lastName,
			userId: id,
			sex: gender
		};

		let token = localStorage.getItem('accessToken');

		this.props.postUpdateUser(obj, token);
	};

	render() {

		let {firstName, lastName, birth, gender, address, email, onLoading, updateSuccess} = this.state;

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
							<Menu
								path={this.props.match.path}
							/>

							<div className="col-xs-12 col-md-9">
								<div className="user-main-setting-wrapper">
									<h1 className="user-main-setting-title">Thông tin cá nhân</h1>
									<div className="user-main-setting-content">

										{onLoading &&
											<Loading/>
										}

										<form className="info-user-cnt" onSubmit={this.onHandleSubmit}>

											{updateSuccess &&
												<Alert bsStyle="success">
													Chúc mừng ! Bạn đã cập nhật tài khoản thành công<br/>
												</Alert>
											}

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

											{/*<div className="form-group">*/}
												{/*<label>Địa chỉ</label>*/}
												{/*<input*/}
													{/*type="text"*/}
													{/*name="address"*/}
													{/*value={address}*/}
													{/*className="form-control"*/}
													{/*onChange={this.onHandleChange}*/}
												{/*/>*/}
											{/*</div>*/}

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

const mapDispatchToProps = (dispatch) => {
	return {
		postUpdateUser: (obj, token) => {
			dispatch(action.postUpdateUser(obj, token))
		}
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (Information));