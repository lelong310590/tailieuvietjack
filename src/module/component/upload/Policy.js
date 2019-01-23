import React, {Component, Fragment} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import * as api from "../../const/Api";

class Policy extends Component {

	constructor(props) {
		super(props);
		this.state = {
			policy: []
		}
	}

	componentDidMount = () => {
		axios.get(api.API_GET_POST, {
			params: {
				slug: 'chinh-sach'
			}
		})
			.then(response => {
				this.setState({
					policy: response.data.content
				})
			})
			.catch(err => {
				console.log(err)
			})
	}

	policyResponse = (value) => {
		this.props.policyResponse(value);
	};

	render() {

		let {policy} = this.state;

		return (
			<Fragment>
				<div className="policy-popup-overlay"></div>
				<div className="policy-box-wrapper">
					<div className="policy-box-content">
						<div className="policy-content">
							<h4 className="text-center">Các tài liệu cấm đăng tải trên website VietJack</h4>
							{ReactHtmlParser(policy)}
						</div>

						<p>Cam kết không tải lên website VietJack tài liệu cấm được quy định như trên</p>
						<p>Đồng ý với các điều khoản của hợp đồng và quy chế hoạt động của website VietJack</p>

						<div className="policy-box-action text-right">
							<button onClick={() => this.policyResponse(true)}>Đồng ý và tải lên</button>
							<button onClick={() => this.policyResponse(false)}>Không đồng ý</button>
						</div>
					</div>
				</div>
			</Fragment>

		);
	}
}

export default Policy;