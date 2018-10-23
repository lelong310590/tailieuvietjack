import React, {Component} from 'react';
import SaveAll from "./SaveAll";

class UploadContent extends Component {
	render() {
		return (
			<section className="upload-file-edit">
				<h4 className="upload-file-edit-title text-center">Tải tài liệu lên VietJack</h4>
				<button className="upload-file-upload-more center-block">Tải thêm</button>

				<div className="upload-result-wrapper">
					<SaveAll/>
				</div>
			</section>
		);
	}
}

export default UploadContent;