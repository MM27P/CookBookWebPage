import React, { Component } from "react";
import { 
	Typography,
	Paper,
	Grid,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Input,
	TextField,
	Card,
	CardMedia
} from '@material-ui/core';
import axios from "axios";
import cookie from "react-cookies";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  	RecipeRoot: {
  		backgroundColor: "#EFF2F1",
  		width: "75%",
  		display: 'inline-block'
  	},
  	media: {
  		width: "90%",
  		height: 0,
  		paddingTop: '56.25%', // 16:9,
  		marginTop:'30'
  	},
  	title: {
  		width: "90%",
  		color: "#259A69",
  		fontWeight: 400
  	},
  	subtitle: {
  		color: "#707070",
  		fontWeight: 400		
  	},
  	normalFont: {
  		color: "#707070",
  		fontWeight: 200
  	},
  	popupTitle: {
  		color: "#201E50",
  	},
  	buttonStyle: {
  		backgroundColor: "#201E50",
		color: "#EFF2F1",
		'&:hover': {
        backgroundColor: "#403E80",
    	},
  	},
});	 	

class SingleRecipe extends Component {
	constructor(props){
		super(props);

		this.state = {
			name: "",
			ingridients: "",
			description: "",
			image_url: "",
			editDialogOpen: false
		}

		this.handleDelete = this.handleDelete.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	updateData = () => {
		this.props.updateData()
	}

	handleDelete(event) {
		axios.defaults.xsrfCookieName = "csrftoken";
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.headers.post["X-CSRFTOKEN"] = cookie.load("csrftoken");
		axios.delete("http://localhost:8000/api/removerecipe/" + this.props.recipe.id)
		.then(response => {
			this.updateData()
		})
		.catch(error => {
			console.log("nie ma takiego przepisu do usunięcia")
			this.updateData()
		})
	}

	handleEdit(evet) {
		console.log("EDIT EDIT")
		this.setState({
			name: this.props.recipe.name,
			ingridients: this.props.recipe.ingridients,
			description: this.props.recipe.description,
			image_url: this.props.recipe.image_url,
			editDialogOpen: true
		}, () => console.log(this.state))
	}

	handleSave(event) {
		axios.defaults.xsrfCookieName = "csrftoken";
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.headers.post["X-CSRFTOKEN"] = cookie.load("csrftoken");
		axios.put("http://localhost:8000/api/updaterecipe/" + this.props.recipe.id, {
			id:				this.props.recipe.id,
			name:			this.state.name,
			ingridients: 	this.state.ingridients,
			description:	this.state.description,
			image_url: 		this.state.image_url,
			creator:		this.props.recipe.creator,
			user:			this.props.recipe.user,
			created_at:		this.props.recipe.created_at,
		})
		.then(response => {
			this.updateData()
		})
		.catch(error => {
			this.updateData()
		})

		this.setState({
			name: "",
			description: "",
			ingridients: "",
			image_url: "",
			editDialogOpen: false
		})
	}

	handleCancel(event) {
		this.setState({
			name: "",
			description: "",
			ingridients: "",
			image_url: "",
			editDialogOpen: false
		})
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		const { classes } = this.props;
		return(
			<div>
				<br/>
				<Card elevation={10} classes={{root: classes.RecipeRoot}}>
					<Typography variant="h2" align="left" component="h2" gutterBottom classes={{root: classes.title}}>
	        			{this.props.recipe.name}
	      			</Typography>
	      			<IconButton color="secondary" onClick={this.handleDelete}>
	      				<DeleteIcon/>
	      			</IconButton>
	      			<IconButton color="primary" onClick={this.handleEdit}>
	      				<EditIcon/>
	      			</IconButton>
	      			<br/>
	      			<br/>
	      			<br/>
	      			<Grid container>
	      				<Grid item xs={3}>
	      				<CardMedia
	      					className={classes.media}
	      					image={this.props.recipe.image_url}
	      					title={this.props.recipe.name}
	      				/>
	      				</Grid>
	      				<Grid item xs={9}>
	      				<Typography variant="h4" align="left" classes={{root: classes.subtitle}}>
		      			Ingridients
		      			</Typography>
						<Typography variant="h5" align="left" component="h5" gutterBottom style={{whiteSpace: 'pre-line'}} classes={{root: classes.normalFont}}>
		        			{this.props.recipe.ingridients}
		      			</Typography>
		      			<Typography variant="h4" align="left" classes={{root: classes.subtitle}}>
		      			Description
		      			</Typography>
		      			<Typography variant="h5" align="left" gutterBottom style={{whiteSpace: 'pre-line'}} classes={{root: classes.normalFont}}>
		        			{this.props.recipe.description}
		      			</Typography>
		      			</Grid>
	      			</Grid>
				</Card>
				<br/>
				<Dialog open={this.state.editDialogOpen} fullWidth="true" maxWidth="sm">
					<DialogTitle classes={{root: classes.popupTitle}}> Edit Recipe </DialogTitle>
					<DialogContent>
						<TextField
			      			type="text"
			      			label="name"
					  	   	name="name"
					  	   	placeholder="Name"
					  	   	value={this.state.name}
					  	   	onChange={this.handleChange}
					  	   	required/>
					  	<TextField
				      		type="text"
				      		label="Ingridients"
				      		name="ingridients"
				      		placeholder="Ingridients"
				      		value={this.state.ingridients}
				      		onChange={this.handleChange}
				      		multiline="true"
				      		rowsMax="10"
				      		rows="5"
				      		fullWidth="true"
				      		required/>
				      	<TextField
				      		type="text"
				      		name="description"
				      		label="Description"
				      		placeholder="Description"
				      		value={this.state.description}
				      		onChange={this.handleChange}
				      		multiline="true"
				      		rows="5"
				      		fullWidth="true"
				      		required/>
				      	<TextField
				      		type="text"
				      		label="Image URL"
				      		name="image_url"
				      		placeholder="Image URL"
				      		value={this.state.image_url}
				      		onChange={this.handleChange}
				      		multiline="false"
				      		fullWidth="true"/>
			      	</DialogContent>
			      	<DialogActions>
				      	<Button
				      		classes={{root: classes.buttonStyle}}
				      		onClick={this.handleSave}
				      		variant="contained"
				      		color="primary"
				      		size="large"
				      		startIcon={<SaveIcon />}>
				      			Save Changes
				      	</Button>
				      	<Button
				      		classes={{root: classes.buttonStyle}}
				      		onClick={this.handleCancel}
				      		variant="contained"
				      		color="primary"
				      		size="large"
				      		startIcon={<CloseIcon />}>
				      			Cancel
				      	</Button>
				    </DialogActions>
				</Dialog>
			</div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(SingleRecipe);