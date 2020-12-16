import React, { Component } from "react";
import axios from 'axios';
import { 
	Typography,
	Paper,
	Grid,
	Input,
	Button,

} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

export default class RegisterPage extends Component {
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
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(event) {
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
			console.log("registration res", response)
		}).catch(error => {
			console.log("registration error", error)
		})
		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
		console.log("handle Change",event);
	}

	render() {
		return (
			<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
				<Typography variant="h5" align="center" component="h2" gutterBottom>
        			Register User
      			</Typography>
				<form onSubmit={this.handleSubmit}>
				<Paper style={{ padding: 16 }}>
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
						<Grid item xs={6} align="center">
						<Input 
							type="password" 
							name="password" 
							placeholder="Passwrod" 
							value={this.state.password} 
							onChange={this.handleChange} 
							required/>
						<br/>
						</Grid>
						<Grid item xs={6} align="center">
						<Input 
							type="password" 
							name="password_confirmation" 
							placeholder="Passwrod confirmation" 
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
	        					startIcon={<SaveIcon />}> 
	        						Register 
        					</Button>
						</Grid>
					</Grid>
				</Paper>
				</form>
			</div>	
		);
	}
}