import React, {Component} from 'react';

class Loading extends Component {
	render() {
		return (
			<div className="loading-wrapper">
				<div className="lds-css ng-scope">
					<div className="lds-spin" style={{'': '100%', 'height': '100%'}}>
						<div>
							<div></div>
						</div>
						<div>
							<div></div>
						</div>
						<div>
							<div></div>
						</div>
						<div>
							<div></div>
						</div>
						<div>
							<div></div>
						</div>
						<div>
							<div></div>
						</div>
						<div>
							<div></div>
						</div>
						<div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Loading;