import React, {Component} from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

class FacebookComment extends Component {
	render() {
		return (
			<div className="facebook-comment">
				<FacebookProvider appId="1642028219373274">
					<Comments
						href="http://www.facebook.com"
						width="100%"
					/>
				</FacebookProvider>
			</div>
		);
	}
}

export default FacebookComment;