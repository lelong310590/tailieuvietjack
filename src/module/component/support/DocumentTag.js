import React, {Component} from 'react';

class DocumentTag extends Component {
	render() {
		return (
			<div className="document-tag">
				{this.props.format === 'pdf' &&
					<span className="btn pdf">PDF</span>
				}

				{(this.props.format === 'doc' || this.props.format === 'docx') &&
					<span className="btn doc">W</span>
				}
			</div>
		);
	}
}

export default DocumentTag;