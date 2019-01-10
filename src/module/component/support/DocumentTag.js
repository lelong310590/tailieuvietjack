import React, {Component} from 'react';

class DocumentTag extends Component {
	render() {
		return (
			<div className="document-tags">
				{this.props.format === 'pdf' &&
					<img src="/lib/images/pdf.png" alt="" className="img-responsive"/>
				}

				{(this.props.format === 'doc' || this.props.format === 'docx') &&
					<img src="/lib/images/doc.png" alt="" className="img-responsive"/>
				}
			</div>
		);
	}
}

export default DocumentTag;