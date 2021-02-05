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
import { withStyles } from "@material-ui/styles";
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => ({
  	paperRoot: {
	  	backgroundColor: '#201E50'
  	},
  	paperRegisterStyle: {
  		backgroundColor: "#EFF2F1"
  	},
  	title: {
  		color: "#F5AF31"
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
  	},
});	

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email : "",
			username : "",
			name : "",
			surname : "",
			password : "",
			password_confirmation: "",
			registrationErrors: "",
			okDialogOpen: false,
			wrongDialogOpen: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.closePopup = this.closePopup.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		const {
			username,
			password,
			email,
			name,
			surname
		} = this.state;
		
		axios.post("http://localhost:8000/api/createuser", {
			username: username,
			password: password,
			email:	email,
			name:	name,
			surname: surname
		},
		{ withCredentials: true }
		).then( response => {
			this.setState({
				okDialogOpen:true,
				email : "",
				username : "",
				name : "",
				surname : "",
				password : "",
				password_confirmation: "",
			})
		}).catch(error => {
			this.setState({wrongDialogOpen:true})
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	closePopup(event) {
		this.setState({
			okDialogOpen: false,
			wrongDialogOpen: false
		})
	}

	render() {
		const { classes }  = this.props;
		return (
			<Paper classes={{ root: classes.paperRoot}} align = "center" justify = "center" alignItems = "center">
			<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>			
				<Typography classes={{root: classes.title}} variant="h4" align="center" component="h2" gutterBottom>
        			REGISTER USER
      			</Typography>
				<form onSubmit={this.handleSubmit}>
				<Paper classes={{ root: classes.paperRegisterStyle}} style={{ padding: 16 }}>
					<Grid container spacing={2}>
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
						<Grid item xs={6} align="center">
						<Input 
							type="password" 
							name="password" 
							placeholder="Password" 
							autoComplete="new-password"
							value={this.state.password} 
							onChange={this.handleChange} 
							required/>
						<br/>
						</Grid>
						<Grid item xs={6} align="center">
						<Input 
							type="password" 
							name="password_confirmation" 
							placeholder="Password confirmation" 
							autoComplete="new-password"
							value={this.state.password_confirmation} 
							onChange={this.handleChange} 
							required/>
						<br/>
						</Grid>
						<Grid item xs={12} align="center">
						<Input 
							type="email" 
							name="email" 
							placeholder="Email" 
							value={this.state.email} 
							onChange={this.handleChange} 
							required/>
						<br/>
						</Grid>
						<Grid item xs={6} align="center">
						<Input 
							type="text" 
							name="name" 
							placeholder="Name" 
							value={this.state.name} 
							onChange={this.handleChange} 
							required/>
						<br/>
						</Grid>
						<Grid item xs={6} align="center"	>
						<Input 
							type="text" 
							name="surname" 
							placeholder="Surname" 
							value={this.state.surname} 
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
	        					startIcon={<SaveIcon />}
	        					classes={{root: classes.buttonStyle}}> 
	        						Register 
        					</Button>
						</Grid>
					</Grid>
				</Paper>
				</form>
				<Dialog open={this.state.okDialogOpen}>
	      			<DialogTitle classes={{root: classes.popupTitle}}> Registration status </DialogTitle>
	      			<DialogContent>
	      				<DialogContentText id="alert-dialog-description">
	      					You have been registered 
	      				</DialogContentText>
	      			</DialogContent>
	      			<DialogActions>
						<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> Great! </Button>
					</DialogActions>
	      		</Dialog>

	      		<Dialog open={this.state.wrongDialogOpen} PaperProps={{ style: { backgroundColor: "#F5AF31" } }} >
	      			<DialogTitle classes={{root: classes.popupTitle}}> Registration status </DialogTitle>
	      			<DialogContent> 
	      				<DialogContentText id="alert-dialog-description">
	      					Something went wrong! Sorry :( 
	      				</DialogContentText>
	      			</DialogContent>
	      			<DialogActions>
						<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> OK (sad) </Button>
					</DialogActions>
	      		</Dialog>
	      		
			</div>	
			</Paper>
		);
	}
}

export default withStyles(styles, {withTheme: true})(RegisterPage);