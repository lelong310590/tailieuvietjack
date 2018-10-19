import React, {Component, Fragment} from 'react';

class Policy extends Component {

	policyResponse = (value) => {
		this.props.policyResponse(value);
	};

	render() {
		return (
			<Fragment>
				<div className="policy-popup-overlay"></div>
				<div className="policy-box-wrapper">
					<div className="policy-box-content">
						<div className="policy-content">
							<h4 className="text-center">Các tài liệu cấm đăng tải trên website VietJack</h4>
						</div>

						<p>Cam kết không tải lên website 123doc.org tài liệu cấm được quy định như trên</p>
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