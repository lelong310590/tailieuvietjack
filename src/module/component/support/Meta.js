import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';

class Meta extends Component {
	render() {

		return (
			<MetaTags>
				<title>{this.props.title} | Cộng đồng chia sẻ, upload, download sách, giáo án điện tử, bài giảng điện tử và e-book</title>
				<meta name="description" content={this.props.description} />
				<meta name="keywords" content={this.props.keywords} />
			</MetaTags>
		);
	}
}

export default Meta;