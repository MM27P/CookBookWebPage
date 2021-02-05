import React, { Component } from "react";
import axios from 'axios';
import { 
	Typography,
	Paper,
	Grid,
	Input,
	Button,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	DialogActions
} from '@material-ui/core';
import { Redirect } from "react-router-dom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DjangoCSRFToken from 'django-react-csrftoken';
import cookie from "react-cookies";
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  	paperRoot: {
	  	backgroundColor: '#201E50'
  	},
  	title: {
  		color: "#F5AF31"
  	},
  	paperLoginStyle: {
  		backgroundColor: "#EFF2F1"
  	},
  	buttonStyle: {
  		backgroundColor: "#201E50",
		color: "#EFF2F1",
		'&:hover': {
        backgroundColor: "#403E80",
    	},
  	},
  	popupTitle: {
  		color: "#201E50",
  	}
});	


class LoginPage extends Component {
	constructor(props, context) {
		super(props, context);
				

		this.state = {
			username : "",
			password : "",
			redirect : false,
			wrongDialogOpen : false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}

	updateUserLoginState = () => {
			this.props.updateUserLoginState()
		}

	handleSubmit(event) {
		event.preventDefault();
		const {
			username,
			password
		} = this.state;
		axios.defaults.xsrfCookieName = "csrftoken";
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.headers.post["X-CSRFTOKEN"] = cookie.load("csrftoken");
		axios.post("http://localhost:8000/api/login", {
			username: username,
			password: password
		}, { withCredentials: true }).then(response => {
			this.updateUserLoginState()
			this.timeoutHandle = setTimeout(() => this.setState({redirect : true}), 1000)
		}).catch(error => {
			this.setState({wrongDialogOpen:true})
		})
		
	}

	componentWillUnmount(){
		if (this.timeoutHandle)
			clearTimeout(this.timeoutHandle);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	closePopup(event) {
		this.setState({
			wrongDialogOpen: false
		})
	}

	render() {
		const { classes } = this.props;
		return (
			this.state.redirect ? (<Redirect to="/"/>)
				:
				(
					<Paper classes={{ root: classes.paperRoot}} align = "center" justify = "center" alignItems = "center">
					<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
					<Typography classes={{ root: classes.title}} variant="h3" align="center" component="h2" gutterBottom>
	        			LOGIN
	      			</Typography>
	      			<form onSubmit={this.handleSubmit}>
	      				<DjangoCSRFToken/>
	      				<Paper classes={{root: classes.paperLoginStyle}} style={{padding: 16}}>
	      					<Grid container alignItems="flex-start" spacing={2}>
							<Grid item xs={12} align="center">
								<Input 
									type="text" 
									name="username" 
									placeholder="Username" 
									autoComplete="username"
									value={this.state.username} 
									onChange={this.handleChange} 
									required/>
								<br/>
							</Grid>
							<Grid item xs={12} align="center">
							<Input 
								type="password" 
								name="password" 
								placeholder="Password" 
								autoComplete="current-password"
								value={this.state.password} 
								onChange={this.handleChange} 
								required/>
							<br/>
							</Grid>
							<Grid item xs={12} align="center">
							
								<Button 
									onClick={this.handleSubmit}
									variant="contained"
		        					color="primary"
		        					size="large" 
		        					startIcon={<LockOpenIcon />}
		        					classes={{root: classes.buttonStyle}}> 
		        						Login 
	        					</Button>
							</Grid>
							</Grid>
	      				</Paper>
	      			</form>
	      			<Dialog open={this.state.wrongDialogOpen} PaperProps={{ style: { backgroundColor: "#F5AF31" } }} >
	      			<DialogTitle classes={{root: classes.popupTitle}}> Login status </DialogTitle>
	      			<DialogContent> 
	      				<DialogContentText>
	      					Something went wrong! Sorry :( 
	      				</DialogContentText>
	      			</DialogContent>
	      			<DialogActions>
						<Button onClick={this.closePopup} color="primary" variant="contained"> OK (sad) </Button>
					</DialogActions>
	      		</Dialog>
				</div>
				</Paper>)
			
		);
	}
}

export default withStyles(styles, {withTheme: true})(LoginPage);