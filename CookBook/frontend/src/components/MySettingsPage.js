import React, { Component } from "react";
import {
	Paper,
	Typography,
	Grid,
	Input,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions
} from '@material-ui/core';
import axios from "axios";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import cookie from "react-cookies";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	paperRoot: {
	  	backgroundColor: '#201E50'
  	},
  	paperStyle: {
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

class MySettingsPage extends Component {
	constructor(props) {
		super(props)

		this.state ={
			email : "start",
			username : "",
			name : "",
			surname : "",
			currentPassword: "",
			password : "",
			password_confirmation: "",
			data: "",
			okDialogOpen: false,
			wrongDialogOpen: false,
			okPasswordDialogOpen: false,
			wrongPasswordDialogOpen: false,
			wrongLoginDialogOpen: false
		}

		this.handleChange = this.handleChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this)
		this.handleUserDataChange = this.handleUserDataChange.bind(this)
		this.getData = this.getData.bind(this)
		this.closePopup = this.closePopup.bind(this);
		this.performLogin = this.performLogin.bind(this);
	}

		updateUserLoginState = () => {
			this.props.updateUserLoginState()
		}

	getData() {
		axios.get("http://localhost:8000/api/users/"+ this.props.userData.user.id)
			.then(response => {
				var data = response.data[0]
				this.setState({
					email: data.email,
					name: data.name,
					surname: data.surname,
					data: data

				})
			})
			.catch(error => {
			})
	}

	componentDidMount() {
		this.getData()
	}


	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handlePasswordChange(event) {
		var tempUser = this.state.data;
		if (this.state.password === this.state.password_confirmation) {
			axios.defaults.xsrfCookieName = "csrftoken";
			axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
			axios.defaults.headers.post["X-CSRFTOKEN"] = cookie.load("csrftoken");
			axios.put("http://localhost:8000/api/updateuserpassword/" + this.props.userData.user.id, {
				id: this.state.data.id,
				username: this.state.data.username,
				password: this.state.password,
				current_password: this.state.currentPassword
			}).then(response => {
				this.getData()
				this.performLogin()
				this.setState({
					okPasswordDialogOpen : true,
					currentPassword: "",
					password: "",
					password_confirmation: ""
				})
			}).catch(error => {
				this.getData()
				this.setState({
					wrongPasswordDialogOpen : true
				})
			})
		} else {
			this.setState({wrongPasswordDialogOpen : true})
		}

	}


	closePopup(event) {
		this.setState({
			okDialogOpen: false,
			wrongDialogOpen: false,
			okPasswordDialogOpen: false,
			wrongPasswordDialogOpen: false,
			wrongLoginDialogOpen: false
		})
	}

	handleUserDataChange(event) {
		var tempUser = this.state.data;
		tempUser.email = this.state.email;
		tempUser.name = this.state.name;
		tempUser.surname = this.state.surname;
		axios.defaults.xsrfCookieName = "csrftoken";
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.headers.post["X-CSRFTOKEN"] = cookie.load("csrftoken");
		axios.put("http://localhost:8000/api/updateuser/" + this.props.userData.user.id, {
			name: this.state.name,
			surname: this.state.surname,
			email: this.state.email,
			id: this.state.data.id,
			created_at: this.state.data.created_at,
			username: this.state.data.username
		}).then(response => {
			this.getData()
			this.setState({
				okDialogOpen : true
			})
		}).catch(error => {
			this.getData()
			this.setState({
				wrongDialogOpen : true
			})
		})
	}

	performLogin(){
		axios.defaults.xsrfCookieName = "csrftoken";
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.headers.post["X-CSRFTOKEN"] = cookie.load("csrftoken");
		axios.post("http://localhost:8000/api/login", {
			username: this.state.data.username,
			password: this.state.password
		}, { withCredentials: true }).then(response => {
			this.updateUserLoginState()
		}).catch(error => {
			console.log(error)
			this.setState({wrongLoginDialogOpen:true})
		})
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
			<Paper classes={{ root: classes.paperRoot}} align = "center" justify = "center" alignItems = "center">
				<br/>
				<Typography classes={{ root: classes.title}} variant="h4" align="center" component="h2" gutterBottom> SETTINGS </Typography>
				<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
					<form onSubmit={this.handleUserDataChange}>
					<Paper elevation={3} style={{ padding: 16 }} classes={{ root: classes.paperStyle}}>
						<Grid Container spacing={2}>
							<Grid item xs={12} align="center">
								<Typography variant="h6" classes={{root: classes.popupTitle}}>
									User Data
								</Typography>
							</Grid>
							<Grid item xs={12} align="center">
							<Input 
								type="email" 
								name="email" 
								placeholder="Email" 
								value={this.state.email} 
								onChange={this.handleChange} 
								required/>
							</Grid>
							<Grid item xs={12} align="center">
							<Input 
								type="text" 
								name="name" 
								placeholder="Name" 
								value={this.state.name} 
								onChange={this.handleChange} 
								required/>
							</Grid>
							<Grid item xs={12} align="center">
							<Input 
								type="text" 
								name="surname" 
								placeholder="Surname" 
								value={this.state.surname} 
								onChange={this.handleChange} 
								required/>
							</Grid>
							<br/>
							<Grid item xs={12} align="center">
							<Button 
								classes={{root: classes.buttonStyle}}
								onClick={this.handleUserDataChange}
								variant="contained"
	        					color="primary"
	        					size="large" 
	        					startIcon={<SaveIcon />}> 
	        						Save Changes 
        					</Button>
        					</Grid>
						</Grid>
					</Paper>
					</form>
				<br/>
				<form onSumbit={this.handlePasswordChange}>
				<Paper elevation={3} classes={{ root: classes.paperStyle}}>
					<br/>
					<Grid Container spacing={2}>
						<Grid item xs={12} align="center">
							<Typography variant="h6" classes={{root: classes.popupTitle}}>
								Password Changing
							</Typography>
						</Grid>
						<Grid item xs={12} align="center">
						<Input 
							type="password" 
							name="currentPassword" 
							placeholder="Current Password" 
							autoComplete="current-password"
							value={this.state.currentPassword} 
							onChange={this.handleChange} 
							required/>
						</Grid>
					<Grid item xs={12} align="center">
						<Input 
							type="password" 
							name="password" 
							placeholder="Password" 
							autoComplete="new-password"
							value={this.state.password} 
							onChange={this.handleChange} 
							required/>
						</Grid>
						<Grid item xs={12} align="center">
						<Input 
							type="password" 
							name="password_confirmation" 
							placeholder="Password confirmation" 
							autoComplete="new-password"
							value={this.state.password_confirmation} 
							onChange={this.handleChange} 
							required/>
						</Grid>
						<br/>
						<Grid item xs={12} align="center">
							<Button 
								classes={{root: classes.buttonStyle}}
								onClick={this.handlePasswordChange}
								variant="contained"
	        					color="primary"
	        					size="large" 
	        					startIcon={<EditIcon />}> 
	        						Change Password 
        					</Button>
						</Grid>
					</Grid>
					<br/>
				</Paper>
				</form>
				</div>
				</Paper>
				<Dialog open={this.state.okDialogOpen}>
	      			<DialogTitle classes={{root: classes.popupTitle}}> User Data status </DialogTitle>
	      			<DialogContent> 
	      				<DialogContentText>
	      					Your data have been updated 
	      				</DialogContentText>
	      			</DialogContent>
	      			<DialogActions>
						<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> Great! </Button>
					</DialogActions>
	      		</Dialog>

	      		<Dialog open={this.state.wrongDialogOpen} PaperProps={{ style: { backgroundColor: "#F5AF31" } }} >
	      			<DialogTitle classes={{root: classes.popupTitle}}> User Data status </DialogTitle>
	      			<DialogContent> 
	      				<DialogContentText> 
	      					Something went wrong! Sorry :( 
	      				</DialogContentText>
	      			</DialogContent>
	      			<DialogActions>
						<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> OK (sad) </Button>
					</DialogActions>
	      		</Dialog>

	      		<Dialog open={this.state.okPasswordDialogOpen}>
	      			<DialogTitle classes={{root: classes.popupTitle}}> Password status </DialogTitle>
	      			<DialogContent> 
	      				<DialogContentText>
	      					Password has been changed 
	      				</DialogContentText>
	      			</DialogContent>
	      			<DialogActions>
						<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> Great! </Button>
					</DialogActions>
	      		</Dialog>

	      		<Dialog open={this.state.wrongPasswordDialogOpen} PaperProps={{ style: { backgroundColor: "#F5AF31" } }} >
	      			<DialogTitle classes={{root: classes.popupTitle}}> Password status </DialogTitle>
	      			<DialogContent> 
	      				<DialogContentText>
	      				Something went wrong! Sorry :( 
	      				</DialogContentText>
	      			</DialogContent>
	      			<DialogActions>
						<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> OK (sad) </Button>
					</DialogActions>
	      		</Dialog>

	      		<Dialog open={this.state.wrongLoginDialogOpen} PaperProps={{ style: { backgroundColor: "#F5AF31" } }} >
	      			<DialogTitle classes={{root: classes.popupTitle}}> Login status </DialogTitle>
	      			<DialogContent> 
	      				<DialogContentText>
	      					Something went wrong! Sorry :( 
	      				</DialogContentText>
	      			</DialogContent>
	      			<DialogActions>
						<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> OK (sad) </Button>
					</DialogActions>
	      		</Dialog>
			</div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(MySettingsPage);