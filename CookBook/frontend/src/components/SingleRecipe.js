import React, { Component } from "react";
import { 
	Typography,
	Paper,
	Grid,
	Card,
	CardMedia,
} from '@material-ui/core';
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
  	}
});	 	

class SingleRecipe extends Component {
	constructor(props){
		super(props);
	}


	render() {
		const { classes }  = this.props;
		return(
			<div>
				<br/>
				<Card elevation={10} classes={{root: classes.RecipeRoot}}>
					<Typography classes={{root: classes.title}} variant="h2" align="left" component="h2" gutterBottom>
	        			{this.props.recipe.name}
	      			</Typography>
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
	      			<br/>
				</Card>
			</div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(SingleRecipe);