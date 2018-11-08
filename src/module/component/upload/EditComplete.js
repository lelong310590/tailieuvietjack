import React, {Component, Fragment} from 'react';
import _ from 'lodash';

class EditComplete extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tags: []
		}
	}

	componentWillMount = () => {
		let {tags} = this.props;
		this.setState({tags})
	};

	render() {

		let {tags} = this.state;

		return (
			<div className="upload-result-wrapper">
				<div className="alert alert-success">
					<strong><i className="fas fa-check"></i></strong> Tải lên thành công
				</div>
				<div className="save-all-mode">
					<div className="upload-result">
						<div className="on-edit-complete">
							<img
								src={'/lib/images/bg_changeImg.jpg'}
								alt=""
								className="img-responsive"
								width={152}
								height={182}
							/>
						</div>
						<div className="upload-result-right">
							<div className="on-edit-complete-info">
								<h4>{this.props.name}</h4>
								<p><b>Lớp:</b> {this.props.classes} - <b>Môn học:</b> {this.props.subject}</p>
								<p><b>Mô tả: {this.props.description}</b></p>
								<p><b>Từ khóa: </b>
									{_.map(tags, (t, i) => {
										return (
											<Fragment>
												{i === (tags.length - 1) ? (
													<Fragment>{t}</Fragment>
												) : (
													<Fragment>{t} - </Fragment>
												)}
											</Fragment>
										)
									})}
								</p>
								<p><b>Giá bán: </b>{this.props.price}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default EditComplete;