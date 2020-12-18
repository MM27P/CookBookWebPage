import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default class NavigationBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Grid align = "center" justify = "center" alignItems = "center" >
				<Button color="secondary" variant="contained" to="/" component={ Link }> Home </Button>
				<Button color="secondary" variant="contained" to="/register" component={ Link }> Register </Button>
				<Button color="secondary" variant="contained" to="/login" component={ Link }> Login </Button>
			</Grid>
		);
	}
}