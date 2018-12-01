import React, {Component} from 'react';
import Breadcrumb from "../doc/Breadcrumb";
import List from "../listDoc/List";
import FilterBox from "../listDoc/FilterBox";
import {connect} from 'react-redux';

class ThematicListDoc extends Component {

	constructor(props) {
		super(props);
		this.state = {
			catName: '',
			catSlug: '',
			subjectName: '',
			subjectSlug: '',
			chapterName: '',
			chapterSlug: this.props.match.params.thematic
		}
	}



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

						<div className="col-xs-12 col-md-3 doc-list-filter-box col-md-pull-9">
							<FilterBox
								title={'Danh sách lớp'}
								type={'classes'}
							/>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = () => {
	return {

	}
};

export default connect(mapStateToProps, mapDispatchToProps) (ThematicListDoc);