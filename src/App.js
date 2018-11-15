import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {connect} from 'react-redux';
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
import Information from "./module/component/user/Information";
import DocManager from "./module/component/user/DocManager";
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import LocationHelper from 'redux-auth-wrapper/history4/locationHelper';
import * as actions from "./module/action/Index";
import Logout from "./module/component/login/Logout";
import CatDoc from "./module/component/listDoc/CatDoc";
import EditDocument from "./module/component/upload/EditDocument";

const locationHelper = LocationHelper({});

const isAuthenticatedUser = connectedRouterRedirect({
	redirectPath: '/dang-nhap',
	authenticatedSelector: state => state.AuthReducer.loggedIn,
	wrapperDisplayName: 'isAuthenticatedUser',
});

const isUnauthenticatedUser = connectedRouterRedirect({
	redirectPath: (state, ownProps) => {
		let redirectTo = locationHelper.getRedirectQueryParam(ownProps) || '/';
		//console.log(redirectTo);
		if (redirectTo === '/dang-xuat') {
			redirectTo = '/';
		}
		return redirectTo;
	},
	allowRedirectBack: false,
	authenticatedSelector: state => !state.AuthReducer.loggedIn,
	wrapperDisplayName: 'isUnauthenticatedUser',
});

class App extends Component {

	componentDidMount = () => {
		let token = localStorage.getItem('accessToken');
		if (token) {
			this.props.handleLogedIn();
			this.props.getUserInfo(token);
		}
	};

	render() {
		return (
			<Router>
				<ScrollToTop>
					<Header/>

					<main className="main" id="main">
						<Switch>
							<Route exact={true} path={'/'} component={Home}/>
							<Route exact={true} path={'/dang-ky'} component={isUnauthenticatedUser(Register)}/>
							<Route exact={true} path={'/dang-nhap'} component={isUnauthenticatedUser(Login)}/>
							<Route exact={true} path={'/dang-xuat'} component={isAuthenticatedUser(Logout)}/>
							<Route exact={true} path={'/quen-mat-khau'} component={isUnauthenticatedUser(ForgotPassword)}/>
							<Route exact={true} path={'/doi-lai-mat-khau/:token'} component={isUnauthenticatedUser(ChangeForgotPassword)}/>

							<Route exact={true} path={'/upload-tai-lieu'} component={Intro}/>
							<Route exact={true} path={'cat/:class/:subject'} component={List}/>
							<Route exact={true} path={'cat/:class'} component={List}/>

							<Route exact={true} path={'/tai-lieu/:slug'} component={Document}/>
							<Route exact={true} path={'/tai-lieu/sua-tai-lieu/:slug'} component={EditDocument}/>

							<Route exact={true} path={'/tai-khoan/:id/thong-tin'} component={isAuthenticatedUser(Information)} />
							<Route exact={true} path={'/tai-khoan/:id/quan-ly-tai-lieu'} component={isAuthenticatedUser(DocManager)} />

							<Route exact={true} path={'/cat/:class'} component={CatDoc} />
							<Route exact={true} path={'/cat/:class/:subject'} component={CatDoc} />

							<Route component={ErrorNoPage}/>
						</Switch>
					</main>
					<Footer/>
				</ScrollToTop>
			</Router>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo: (token) => {
			dispatch(actions.getUserInfo(token))
		},

		handleLogedIn: () => {
			dispatch(actions.handleLogedIn())
		},
	}
};

export default connect(null, mapDispatchToProps) (App);