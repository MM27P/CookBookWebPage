import React, { Component } from "react";
import axios from 'axios';
import { 
	Typography,
	Paper,
	Grid,
	Input,
	Button,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export default class LoginPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username : "",
			password : "",
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}


	handleSubmit(event) {
		const {
			username,
			password
		} = this.state;

		axios.post("http://localhost:8000/api/login", {
			username: username,
			password: password
		}, { withCredentials: true }).then(response => {
			console.log("Login response", response)
		}).catch(error => {
			console.log("Login error", error)
		})
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
		console.log("handle Change", event);
	}

	render() {
		return (
			<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
				<Typography variant="h5" align="center" component="h2" gutterBottom>
        			LOGIN
      			</Typography>
      			<form onSubmit={this.handleSubmit}>
      				<Paper style={{padding: 16}}>
      					<Grid container alignItems="flex-start" spacing={2}>
						<Grid item xs={12} align="center">
							<Input 
								type="text" 
								name="username" 
								placeholder="Username" 
								value={this.state.username} 
								onChange={this.handleChange} 
								required/>
							<br/>
						</Grid>
						<Grid item xs={12} align="center">
						<Input 
							type="password" 
							name="password" 
							placeholder="Passwrod" 
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
	        					startIcon={<LockOpenIcon />}> 
	        						Login 
        					</Button>
						</Grid>
						</Grid>
      				</Paper>
      			</form>
			</div>
		);
	}
}