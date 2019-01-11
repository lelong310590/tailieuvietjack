import React, {Component} from 'react';

class Infomation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			expand: false
		}
	}

	expandContent = () => {
		let {expand} = this.state;
		this.setState({
			expand: !expand
		})
	};

	render() {

		let {expand} = this.state;

		return (
			<div className="document-detail-infomation">
				<h4>THÔNG TIN TÀI LIỆU</h4>
				<div className="document-detail-nfomation-content">
					<div className={expand ? ' text-justify' : 'text-justify collapse-detail-document'}>
						{this.props.content}
					</div>

					<div className="document-detail-expand-button">
						{expand ? (
							<span onClick={this.expandContent}>-- Rút gọn --</span>
						) : (
							<span onClick={this.expandContent}>-- Xem thêm --</span>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default Infomation;