import React, {Component, Fragment} from 'react';
import Slider from "./Slider";
import Introduction from "./Introduction";
import Subject from "./Subject";
import List from "../listDoc/List";
import MetaTags from 'react-meta-tags';

class Home extends Component {
	render() {
		return (
			<Fragment>
				<MetaTags>
					<title>Homepage</title>
					<meta name="description" content="Some description." />
					<meta property="og:title" content="MyApp" />
					<meta property="og:image" content="path/to/image.jpg" />
				</MetaTags>
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