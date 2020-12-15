import React, { Component } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import NavigationBar from "./NavigationBar";
import { 
	BrowserRouter, 
	Switch, 
	Route, 
	Link, 
	Redirect } from "react-router-dom";

export default class HomePage extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<BrowserRouter>
				<NavigationBar />
				<Switch>
					<Route path="/login" component={LoginPage} />
					<Route path="/register" component={RegisterPage} />
					<Route exact path="/">
						<p> This is the homepage </p> 
					</Route>
				</Switch>
			</BrowserRouter>
		)
	}
}