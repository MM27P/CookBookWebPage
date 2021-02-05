import React, { Component } from "react";
import axios from 'axios';
import { 
	Typography,
	Paper,
	Grid,
	Input,
	Button,
	TextField,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	DialogActions

} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import cookie from "react-cookies";
import { withStyles } from "@material-ui/styles";

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
  	normalFont: {
  		color: "#707070",
  		fontWeight: 200
  	},
  	popupTitle: {
  		color: "#201E50"
  	},
});	

class CreateRecipePage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			creator : this.props.userData.user.id,
			name : "",
			ingridients : "",
			description : "",
			image_url : "",
			okDialogOpen: false,
			wrongDialogOpen: false
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.closePopup = this.closePopup.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	handleSubmit(event) {
		const {
			name,
			ingridients,
			description,
			creator,
			image_url,
		} = this.state;
		axios.defaults.xsrfCookieName = "csrftoken";
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.headers.post["X-CSRFTOKEN"] = cookie.load("csrftoken");
		axios.post("http://localhost:8000/api/createrecipe", {
			name: 	name,
			description: description,
			ingridients: ingridients,
			creator:	creator,
			image_url: image_url
		},
		{ withCredentials: true }
		).then( response => {
			this.setState({okDialogOpen: true})
		}).catch(error => {
			this.setState({wrongDialogOpen: true})
		})
	}

	closePopup(event) {
		this.setState({
			okDialogOpen: false,
			wrongDialogOpen: false
		})
	}

	render() {
		const { classes } = this.props;
		return(
			<div>
			<Paper classes={{ root: classes.paperRoot}} align = "center" justify = "center" alignItems = "center">
			<div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
				<Typography classes={{root: classes.title}} variant="h4" align="center" component="h2" gutterBottom>
					CREATE YOUR OWN RECIPE
      			</Typography>
      			<br/>
      			<form onSubmit={this.handleSubmit}>
      			<Paper style={{padding: 16}} elevation={10} classes={{ root: classes.paperStyle}}>
      				<Grid container spacing={2}>
      					<Grid xs={12} align="center">
		      		       	<Input
		      		       		type="text"
				  		       	name="name"
				  		       	placeholder="Name"
				  		       	value={this.state.name}
				  		       	onChange={this.handleChange}
				  		       	required/>
				  		</Grid>
				  		<Grid xs={12} align="center">
		      		       	<Input
			      		       	type="text"
			      		       	name="ingridients"
			      		       	placeholder="Ingridients"
			      		       	value={this.state.ingridients}
			      		       	onChange={this.handleChange}
			      		       	multiline="true"
			      		       	rowsMax="10"
			      		       	rows="5"
			      		       	fullWidth="true"
			      		       	required/>
			      		</Grid>
				  		<Grid xs={12} align="center">
		      		       	<Input
			      		       	type="text"
			      		       	name="description"
			      		       	placeholder="Description"
			      		       	value={this.state.description}
			      		       	onChange={this.handleChange}
			      		       	multiline="true"			      		       	
			      		       	rows="5"
			      		       	fullWidth="true"
			      		       	required/>
			      		</Grid>
			      		<Grid xs={12} align="center">
		      		       	<Input
			      		       	type="text"
			      		       	name="image_url"
			      		       	placeholder="Image online url"
			      		       	value={this.state.image_url}
			      		       	onChange={this.handleChange}
			      		       	multiline="false"			      		       	
			      		       	fullWidth="true"/>
			      		</Grid>
				  		<Grid xs={12} align="center">
				  			<br/>
			      			<Button
			      				classes={{root: classes.buttonStyle}}
			      				onClick={this.handleSubmit}
			      				variant="contained"
			      				color="primary"
			      				size="large"
			      				startIcon={<SaveIcon />}>
			      					Add Recipe to CookBook
			      			</Button>
			      		</Grid>
			      	</Grid>
      			</Paper>
      			</form>
      		</div>
      		</Paper>
      		<Dialog open={this.state.okDialogOpen}>
      			<DialogTitle classes={{root: classes.popupTitle}}> Create Recipe Confirmation </DialogTitle>
      			<DialogContent> 
      				<DialogContentText>
      					I promise that your recipe has been added... really ;) 
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> Great! </Button>
				</DialogActions>
      		</Dialog>

      		<Dialog open={this.state.wrongDialogOpen} PaperProps={{ style: { backgroundColor: "#F5AF31" } }} >
      			<DialogTitle classes={{root: classes.popupTitle}}> Create Recipe Alert!!! </DialogTitle>
      			<DialogContent> 
      				<DialogContentText>
      					Your recipe has not been added. Please check the form. 
      				</DialogContentText>
      			</DialogContent>
      			<DialogActions>
					<Button onClick={this.closePopup} color="primary" variant="contained" classes={{root: classes.buttonStyle}}> Great! </Button>
				</DialogActions>
      		</Dialog>
		    </div>
		)
	}

}

export default withStyles(styles, {withTheme: true})(CreateRecipePage);