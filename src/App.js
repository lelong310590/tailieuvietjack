import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from './ScrollToTop'
import Header from "./module/component/Header";
import Home from "./module/component/home/Home";
import Footer from "./module/component/Footer";
import Register from "./module/component/register/Register";
import Login from "./module/component/login/Login";
import ForgotPassword from "./module/component/login/ForgotPassword";
import ChangeForgotPassword from "./module/component/login/ChangeForgotPassword";
import Intro from "./module/component/upload/Intro";
import List from "./module/component/listDoc/List";
import Document from "./module/component/doc/Document";
import ErrorNoPage from "./module/component/support/ErrorNoPage";

class App extends Component {
	render() {
		return (
			<Router>
				<ScrollToTop>
					<Header/>

					<main className="main" id="main">
						<Switch>
							<Route exact={true} path={'/'} component={Home}/>
							<Route path={'/dang-ky'} component={Register}/>
							<Route path={'/dang-nhap'} component={Login}/>
							<Route path={'/quen-mat-khau'} component={ForgotPassword}/>
							<Route path={'/doi-lai-mat-khau/:token'} component={ChangeForgotPassword}/>

							<Route path={'/upload-tai-lieu'} component={Intro}/>
							<Route path={'cat/:class/:subject'} component={List}/>
							<Route path={'cat/:class'} component={List}/>

							<Route path={'/tai-lieu/:slug'} component={Document}/>

							<Route component={ErrorNoPage}/>
						</Switch>
					</main>
					<Footer/>
				</ScrollToTop>
			</Router>
		);
	}
}

export default App;