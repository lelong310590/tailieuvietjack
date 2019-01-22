import React, {Component} from 'react';
import MetaTags from 'react-meta-tags';
import _ from 'lodash';

class Meta extends Component {
	render() {
		return (
			<MetaTags>
				{_.isEmpty(this.props.title) ? (
					<title>Cộng đồng chia sẻ, upload, download sách, giáo án điện tử, bài giảng điện tử và e-book</title>
				) : (
					<title>{this.props.title} | Cộng đồng chia sẻ, upload, download sách, giáo án điện tử, bài giảng điện tử và e-book</title>
				)}
				<meta name="description" content={this.props.description} />
				<meta name="keywords" content={this.props.keywords} />
			</MetaTags>
		);
	}
}

export default Meta;