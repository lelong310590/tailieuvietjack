import React, {Component} from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Slider extends Component {
	render() {
		return (
			<section className="section-slider">
				<OwlCarousel
					className="main-slider"
					items={1}
					loop
					margin={10}
					dots
				>
					<div className="item" style={{backgroundImage: "url('lib/images/slider.jpg')"}}>
					</div>

					<div className="item" style={{backgroundImage: "url('lib/images/slider02.jpg')"}}>
					</div>
				</OwlCarousel>

				<div className="slider-box">
					<div className="container">
						<div className="slider-box-content">
							<h2 className="slider-box-title">Tiếp cận kho tri thức gần 4 triệu tài liệu</h2>
							<p className="slider-box-subtitle">Hàng ngàn tài liệu của các chuyên ngành phục vụ cho công tác nghiên cứu, giảng dạy, học tập của bạn</p>
							<div className="slider-box-search">
								<form action="" method="post" role="form">
									<div className="form-group">
										<input type="text" className="form-control" name="" id=""
										       placeholder="Tìm kiếm..."/>
									</div>

									<button type="submit" className="btn btn-primary"><i className="fas fa-search"></i>
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Slider;