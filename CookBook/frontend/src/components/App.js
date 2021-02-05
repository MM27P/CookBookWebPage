import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import RegisterPage from "./RegisterPage";
import NavigationBar from "./NavigationBar";
import MyRecipes from "./MyRecipes";
import CreateRecipePage from "./CreateRecipePage";
import MySettingsPage from "./MySettingsPage";
import { 
	BrowserRouter, 
	Switch, 
	Route, 
	Link, 
	Redirect } from "react-router-dom";
import axios from 'axios';


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userData : {
				user : "",
				isLoggedIn : false
			}
		}

		var updateUserLoginState = this.updateUserLoginState.bind(this);
	}

	updateUserLoginState = () => {
			axios.get("http://localhost:8000/api/checkloginstatus")
			.then(resp => {
				this.setState({
					userData : {
						user : resp.data,
						isLoggedIn : true
					}
				})
			})
			.catch(error => {
				this.setState({
					userData : {
						user : "",
						isLoggedIn : false
					}
				})
			})
	}

	render() {
		var updateUserLoginState = this.updateUserLoginState;
		return (
			<div class="app"> 	
				<BrowserRouter>
					<NavigationBar isLoggedIn = {this.state.userData.isLoggedIn} updateUserLoginState={this.updateUserLoginState}/>
					<Switch>
						<Route path="/login" render={props => <LoginPage updateUserLoginState={this.updateUserLoginState} />} />
						<Route path="/register" component={RegisterPage} />
						<Route path="/logout" render={props => <LogoutPage updateUserLoginState={this.updateUserLoginState}/>} />
						<Route path="/myrecipes" render={props => <MyRecipes userData={this.state.userData}/>} />
						<Route path="/createrecipe" render={props => <CreateRecipePage userData={this.state.userData}/>} />
						<Route path="/mysettings" render={props => <MySettingsPage userData={this.state.userData} updateUserLoginState={this.updateUserLoginState}/>}  />
						<Route exact path="/" render={props => <HomePage updateUserLoginState={this.updateUserLoginState} userData={this.state.userData} />} />
					</Switch>
				</BrowserRouter>
				<br/>
				<br/>
				<br/>
			</div>
		)
	}
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);