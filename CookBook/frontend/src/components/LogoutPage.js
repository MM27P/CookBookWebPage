import React, { Component } from "react";
import { 
	Typography,
	Paper,
} from '@material-ui/core';
import { Redirect } from "react-router-dom";
import axios from "axios";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  	paperRoot: {
	  	backgroundColor: '#201E50'
  	},
  	title: {
  		color: "#F5AF31"
  	}
});	

class LogoutPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect : false
		}
	}

	updateUserLoginState = () => {
		this.props.updateUserLoginState()
	}

	componentDidMount(){
		this.timeoutHandle = setTimeout(() => this.setState({redirect : true}), 3000)
		axios.get("http://localhost:8000/api/logout")
			.then(this.updateUserLoginState())
		console.log("LOGOUT")	 
	}

	componentWillUnmount(){
		clearTimeout(this.timeoutHandle);
	}

	render(){
		const { classes } = this.props
		return(
			this.state.redirect ? (
					<Redirect to="/"/>
				): (
					<Paper classes={{ root: classes.paperRoot}} align = "center" justify = "center" alignItems = "center">
						<br/>
						<Typography classes={{ root: classes.title}} variant="h6" align="center" gutterBottom> You are logged out. Soon you will be redirected to homepage. </Typography>
						<br/>
					</Paper>
				)
			
		)
	}


}

export default withStyles(styles, {withTheme: true})(LogoutPage);