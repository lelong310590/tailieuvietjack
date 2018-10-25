import React, {Component, Fragment} from 'react';
import Slider from "./Slider";
import Introduction from "./Introduction";
import List from "../listDoc/List";
import Meta from "../support/Meta";

class Home extends Component {
	render() {
		return (
			<Fragment>

				<Meta/>

				<Slider/>
				<Introduction/>

				<div className="home-wrapper">
					<div className="container">
						<List
							title={'Tài liệu nổi bật'}
							itemClass={'col-xs-6 col-md-2 col-lg-2'}
						/>
					</div>
				</div>

			</Fragment>

		);
	}
}

export default Home;