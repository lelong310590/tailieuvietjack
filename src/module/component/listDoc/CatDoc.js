import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import List from "./List";
import FilterBox from "./FilterBox";

class CatDoc extends Component {
	render() {
		return (
			<section className="document-wrapper">
				<div className="container">
					<Breadcrumb/>

					<div className="row">
						<div className="col-xs-12 col-md-9 document-detail col-md-push-3">
							<List
								itemClass={'col-xs-6 col-md-3 col-lg-3'}
								filterBar={true}
							/>
						</div>

						<div className="col-xs-12 col-md-3 col-md-pull-9 doc-list-filter-box">
							<FilterBox
								title={'Danh sách lớp'}
								type={'classes'}
							/>

							<FilterBox
								title={'Danh sách môn học'}
								type={'subjects'}
							/>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default CatDoc;