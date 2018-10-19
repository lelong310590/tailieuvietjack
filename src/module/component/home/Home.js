import React, {Component, Fragment} from 'react';
import Slider from "./Slider";
import Introduction from "./Introduction";
import Subject from "./Subject";

class Home extends Component {
	render() {
		return (
			<Fragment>
				<Slider/>
				<Introduction/>
				<Subject/>
			</Fragment>

		);
	}
}

export default Home;