import React, { Component } from "react";
import axios from "axios";
import UserSingleRecipe from "./UserSingleRecipe";
import { 
	Typography,
	Paper,
} from '@material-ui/core';
import { withStyles } from "@material-ui/styles";

const styles = theme => ({
  	paperRoot: {
	  	backgroundColor: '#201E50'
  	},
  	title: {
  		color: "#F5AF31"
  	}
});	

class MyRecipes extends Component {
	constructor(props){
		super(props)

		this.state = {
			data : [],
			isDataEmpty : true
		}

		var updateData = this.updateData.bind(this);
	}

	updateData = () => {
		this.getData()
	}

	getData(){
			axios.get("http://localhost:8000/api/recipes/user/" + this.props.userData.user.id)
			.then(response => {
				var data = response.data
				this.setState({
					data: data,
				}, () => {
					if (this.state.data.length === 0) { this.setState({isDataEmpty : true}) }
						else { this.setState({isDataEmpty : false}) }
				})
			})
			.catch(error => {
				console.log(error)
				this.setState({
					data : [],
					isDataEmpty : true
				})
			})
	}

	componentDidMount() {
		this.getData()
	}

	render() {
		const { classes }  = this.props;
		var updateData = this.updateData;
		return(
			<div>
				<Paper classes={{ root: classes.paperRoot}} align = "center" justify = "center" alignItems = "center">
				<br/>
				<Typography classes={{ root: classes.title}} variant="h4" align="center" component="h2" gutterBottom> RECIPES OF USER: {this.props.userData.user.username} </Typography>
							<div>
				{this.state.isDataEmpty ? (
						<div>
						<Typography classes={{ root: classes.title}} variant="h6" align="center" gutterBottom> User does not have any recipes </Typography>
						<br/>
						</div>
					) : (
						this.state.data.map(recipe => (<UserSingleRecipe recipe={recipe} updateData={this.updateData}/>))
					)
				}
			</div>
				<br/>
				</Paper>
			</div>
		)
	}

}

export default withStyles(styles, {withTheme: true})(MyRecipes);