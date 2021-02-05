import React, { Component } from "react";
import axios from "axios";
import { 
	Typography,
	Paper,
	FormControl,
	MenuItem,
	Select,
	InputLabel,
	Grid,
	TextField,
	Input,
	Button
} from '@material-ui/core';
import SingleRecipe from "./SingleRecipe";
import cookie from "react-cookies";
import RegisterPage from "./RegisterPage";
import { withStyles } from "@material-ui/styles";
import yellow from "@material-ui/core/colors/yellow";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
	paperRoot: {
		backgroundColor: '#201E50',
	},
	title: {
		color: "#F5AF31"
	},
	sort: {
		color: "#EFF2F1",
		backgroundColor: '#EFF2F1',
	},
	buttonStyle: {
		backgroundColor: "darkred",
		color: "#EFF2F1",
		'&:hover': {
        	backgroundColor: "red"
		},
	},
	searchFrazeStyle: {
		backgroundColor: "#EFF2F1"
	}	
});	

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data : [],
			isDataEmpty : true,
			isError: false,
			sortType: "nameAsc",
			username: this.props.userData.user.username,
			search_fraze: "",
			during_search: false
		}
		this.updateUserLoginState()

		this.handleSortChange = this.handleSortChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSearch = this.handleSearch.bind(this)
		this.getSearchData = this.getSearchData.bind(this)
	}


	updateUserLoginState = () => {
		this.props.updateUserLoginState()
	}

	getData(){
		axios.get("http://localhost:8000/api/recipes")
			.then(response => {
				var data = response.data
				data.sort(function(a,b){
				if (a.name > b.name) {
					return 1
				} else {
					return -1
				}
				})	
				if(this.state.sortType === "nameDesc"){
					data.sort(function(a,b){
					if (a.name < b.name) {
						return 1
					} else {
						return -1
					}
					})	
				}
				if (this.state.sortType === "dateAsc") {
					data.sort(function(a,b){
						if (a.created_at > b.created_at) {
							return 1
						} else {
							return -1
						}
					})
				}
				if (this.state.sortType === "dateDesc") {
					data.sort(function(a,b){
						if (a.created_at < b.created_at) {
							return 1
						} else {
							return -1
						}
					})
				}
				this.setState({
					data: data,
					isDataEmpty : false,
					isError: false,
					during_search: false
				})
			})
			.catch(error => {
				this.setState({
					data : [],
					isDataEmpty : true,
					isError: true,
					during_search: false
				})
			})
	}


	handleSortChange(event){
		this.setState({
			sortType: event.target.value
		}, () => {
			if (this.state.during_search) {
				this.getSearchData()
 			} else {
 				this.getData()
 			}
		})

	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSearch(event) {
		event.preventDefault();
		this.getSearchData()
	}

	getSearchData() {
		const {
			search_fraze
		} = this.state;
		axios.defaults.xsrfCookieName = "csrftoken";
		axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
		axios.defaults.headers.post["X-CSRFTOKEN"] = cookie.load("csrftoken");
		axios.post("http://localhost:8000/api/searchrecipes", {
			search_fraze: search_fraze
		}).then(response => {
			var data = response.data
				data.sort(function(a,b){
				if (a.name > b.name) {
					return 1
				} else {
					return -1
				}
				})	
				if(this.state.sortType === "nameDesc"){
					data.sort(function(a,b){
					if (a.name < b.name) {
						return 1
					} else {
						return -1
					}
					})	
				}
				if (this.state.sortType === "dateAsc") {
					data.sort(function(a,b){
						if (a.created_at > b.created_at) {
							return 1
						} else {
							return -1
						}
					})
				}
				if (this.state.sortType === "dateDesc") {
					data.sort(function(a,b){
						if (a.created_at < b.created_at) {
							return 1
						} else {
							return -1
						}
					})
				}
				this.setState({
					data: data,
					isDataEmpty : false,
					isError: false,
					during_search: true,
				})
		}).catch(error => {
			if (error.response.data == "Nothing matches"){
				this.setState({
					data: [],
					isDataEmpty : true,
					isError: true,
					during_search: false
				})
			} else {
				this.getData()
			}
		})
	}

	componentDidMount(){
		this.getData()
	}

	render() {
		const { classes }  = this.props;
		return (
			<div>
				<Paper classes={{ root: classes.paperRoot}} align = "center" justify = "center" alignItems = "center">
					<br/>
						<div>
						<Typography  classes={{ root: classes.title}} variant="h4">
							What would you like to eat today?
						</Typography>
						<form onSubmit={this.handleSearch}>
						<Grid container spacing={2} align="center" justify="center" alignItems="flex-end">
							<Grid item>
							<TextField 
								classes={{root: classes.searchFrazeStyle}}
								name="search_fraze" 
								placeholder="Search Name Fraze" 
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<SearchIcon/>
										</InputAdornment>
								  	),
								}}
								value={this.state.search_fraze} 
								onChange={this.handleChange} 
								required/>
							</Grid>	
							<Grid item>
							<Button 
								classes={{root: classes.buttonStyle}}
								onClick={this.handleSearch}
								variant="contained"
								color="primary"
								size="large" 
								startIcon={<SearchIcon />}> 
									Search 
							</Button>
							</Grid>					
						</Grid>
						</form>
						<br/>

						<FormControl variant="filled" classes={{root: classes.sort}}>
							<InputLabel id="simple-select"> Sorting Type</InputLabel>
							<Select
								autoWidth={true} 
								labelId="simple-select"
								id="simple-select"
								value={this.sortType}
								onChange={this.handleSortChange}
								defaultValue="nameAsc"
							>
							<MenuItem value={"nameAsc"}>Name Ascending</MenuItem>
							<MenuItem value={"nameDesc"}>Name Descending</MenuItem>
							<MenuItem value={"dateAsc"}>Creation date Ascending</MenuItem>
							<MenuItem value={"dateDesc"}>Creation date Descending</MenuItem>
							</Select>
						</FormControl>
						</div>
					{this.state.isDataEmpty ? (
							null
						) : (
							this.state.data.map(recipe => (<SingleRecipe recipe={recipe} classes={{root: classes.RecipeRoot}}/>))
						)
					}
					<br/>
					{this.state.isError ? (

							<Typography classes={{ root: classes.title}}> There is no Recipes available </Typography>
						): (
							null
						)
					}
					<br/>
				</Paper>
			</div>
		)
	}
}

export default withStyles(styles, {withTheme: true})(HomePage);