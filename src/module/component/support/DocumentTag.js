import React, {Component} from 'react';

class DocumentTag extends Component {
	render() {
		return (
			<div className="document-tags">
				{this.props.format === 'pdf' &&
					<i className="fas fa-file-pdf" style={{color: 'red'}}></i>
				}

				{(this.props.format === 'doc' || this.props.format === 'docx') &&
					<i className="fas fa-file-word" style={{color: 'blue'}}></i>
				}
			</div>
		);
	}
}

export default DocumentTag;