import React, {Component} from 'react';

class Introduction extends Component {
	render() {
		return (
			<section className="section-intro">
				<div className="container">
					<div className="row">
						<div className="intro-item col-xs-12 col-md-4">
							<div className="intro-icon">
								<i className="fas fa-book"></i>
							</div>
							<div className="intro-text">
								<h4 className="intro-title">4 triệu tài liệu</h4>
								<p className="intro-desc">Và con số này không ngừng tăng lên</p>
							</div>
						</div>

						<div className="intro-item col-xs-12 col-md-4">
							<div className="intro-icon">
								<i className="fas fa-book"></i>
							</div>
							<div className="intro-text">
								<h4 className="intro-title">80,000 online courses</h4>
								<p className="intro-desc">Explore a variety of fresh topics</p>
							</div>
						</div>

						<div className="intro-item col-xs-12 col-md-4">
							<div className="intro-icon">
								<i className="fas fa-book"></i>
							</div>
							<div className="intro-text">
								<h4 className="intro-title">80,000 online courses</h4>
								<p className="intro-desc">Explore a variety of fresh topics</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Introduction;