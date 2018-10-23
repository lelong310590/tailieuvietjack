import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import List from "../listDoc/List";
import Introduction from "../home/Introduction";
import Infomation from "./Infomation";
import Tags from "./Tags";
import FacebookComment from "./FacebookComment";

class Document extends Component {
	render() {
		return (
			<section className="document-wrapper">
				<div className="container">
					<div className="breadcrumb-wrapper">
						<ul>
							<li><Link to="/"><i className="fas fa-home"></i> Trang chủ</Link></li>
							<li><Link to="/"><i className="fas fa-chevron-right"></i> Lớp 8</Link></li>
							<li><Link to="/"><i className="fas fa-chevron-right"></i> Môn toán</Link></li>
						</ul>
					</div>
					<div className="row">
						<div className="col-xs-12 col-md-9 document-detail">
							<h1 className="document-detail-title">Bảng công thức tích phân - đạo hàm - Mũ - logarit</h1>
							<div className="document-info">
								<div className="document-info-page"><i className="far fa-file-alt"></i> 2</div>
								<div className="document-info-view"><i className="far fa-eye"></i> 2045</div>
								<div className="document-info-download"><i className="fas fa-file-download"></i> 849</div>
							</div>

							<div className="document-stats">
								<div className="document-user">
									<div className="header-user">
										<img src="/lib/images/user_small.png" alt="" className="img-responsive user-avatar"/>
										<p className="header-user-name">Long Le Ngoc</p>
									</div>
									<div className="document-report">
										<button>Báo tài liệu vi phạm</button>
									</div>
								</div>

								<div className="document-button">
									<div className="document-download-top-button">
										<span className="document-download-text text-uppercase">Tải xuống</span>
										<span className="document-download-count">1000</span>
									</div>
								</div>
							</div>

							<div className="document-detail-content">

							</div>

							<div className="document-detail-download-button">
								<button><i className="fas fa-file-download"></i> Tải xuống (2 trang)</button>
							</div>

							<List
								title={'Tài liệu cùng tác giả'}
								itemClass={'col-xs-6 col-md-3 col-lg-3'}
							/>

							<Infomation/>

							<Tags/>

							<FacebookComment/>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default Document;