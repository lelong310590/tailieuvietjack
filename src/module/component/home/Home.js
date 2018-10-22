import React, {Component, Fragment} from 'react';
import Slider from "./Slider";
import Introduction from "./Introduction";
import Subject from "./Subject";
import List from "../listDoc/List";

class Home extends Component {
	render() {
		return (
			<Fragment>
				<Slider/>
				<Introduction/>
				<Subject/>
				<List/>
			</Fragment>

		);
	}
}

export default Home;