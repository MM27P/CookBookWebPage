import React, { Component } from "react";
import { 
	Grid,
	Button,
	AppBar,
	Toolbar,
	Typography,
} from '@material-ui/core';
import { Link } from "react-router-dom";
import axios from 'axios';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	toolBarStyle: {
		backgroundColor: "#F5AF31"
	},
	homeButton: {
		marginRight: 2,
	},
  	title: {
		flexGrow: 1,
		color: "#201E50",
		fontWeight: 1000
	},
	buttonStyle: {
		color: "#201E50"
	},
	loginButton: {
		backgroundColor: "#201E50",
		color: "white",
		'&:hover': {
        backgroundColor: "#403E80",
    	},
	}
});	

class NavigationBar extends Component {
	constructor(props) {
		super(props);
	}

	updateUserLoginState = () => {
			this.props.updateUserLoginState()
		}

	render() {
		const { classes }  = this.props;
		return (
			<div className={classes.root}>
			<AppBar position="static" classes={{root: classes.toolBarStyle}}>
				<Toolbar>	
					<Button color="primary" classes={{root: classes.buttonStyle}} size="large" to="/" component={ Link }> Home </Button>
					{!this.props.isLoggedIn ? 
						(<Button color="secondary" classes={{root: classes.buttonStyle}} to="/register" component={ Link }> Register </Button>) : null}
					
					{this.props.isLoggedIn ? 
						(<Button color="secondary" classes={{root: classes.buttonStyle}} to="/myrecipes" component={ Link }> My Recipes </Button>) : null}

					{this.props.isLoggedIn ? 
						(<Button color="secondary" classes={{root: classes.buttonStyle}} to="/createrecipe" component={ Link }> Add Recipe </Button>) : null}

					{this.props.isLoggedIn ? 
						(<Button color="secondary" classes={{root: classes.buttonStyle}} to="/mysettings" component={ Link }> My Settings </Button>) : null}

					<Typography variant="h3" classes={{root: classes.title}} align = "center" justify = "center">
						The Recipe Book
					</Typography>

					{this.props.isLoggedIn ? 
							<Button color="secondary" classes={{root: classes.loginButton}} variant="contained" to="/logout" component={ Link }> Logout </Button>
						 : 
							<Button color="secondary" classes={{root: classes.loginButton}} variant="contained" to="/login" component={ Link }> Login </Button>
					}	
				</Toolbar>			
			</AppBar>
			</div>
		);
	}
}

export default withStyles(styles, {withTheme: true})(NavigationBar);