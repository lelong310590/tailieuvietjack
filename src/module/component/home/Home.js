import React, {Component, Fragment} from 'react';
import Introduction from "./Introduction";
import List from "../listDoc/List";
import Meta from "../support/Meta";
import TreeCategory from "../sidebar/TreeCategory";
import TagCloud from "./TagCloud";
import SubjectList from "./SubjectList";
import Filter from "./Filter";

class Home extends Component {

	render() {
		return (
			<Fragment>

				<Meta/>

				<div className="home-wrapper">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-9">

								<Filter/>

								<div className="row">
									<List
										title={'Tài liệu nổi bật'}
										itemClass={'col-xs-6 col-md-3 col-lg-3'}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Fragment>

		);
	}
}

export default Home;