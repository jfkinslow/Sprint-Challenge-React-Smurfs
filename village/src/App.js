import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			smurfs: [],
		};
	}
	// add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
	// Notice what your map function is looping over and returning inside of Smurfs.
	// You'll need to make sure you have the right properties on state and pass them down to props.
	componentDidMount() {
		axios
			.get('/smurfs')
			.then(res => {
				console.log('App: ', res);
				this.setState({ smurfs: res.data });
				console.log('App: ', this.state);
			})
			.catch(err => console.log('App: ', err));
	}

	addSmurfHandler(event, form) {
		axios
			.post('/smurfs', form)
			.then(res => {
				this.setState({ smurfs: res.data });
			})
			.catch(err => console.log(err));
	}

	deleteSmurf(event, id) {
		axios
			.delete('/smurfs', id)
			.then(res => this.setState({ smurfs: res.data }))
			.catch(err => console.log(err));
	}
	withProps(Component, props) {
		return function(matchProps) {
			return <Component {...props} {...matchProps} />;
		};
	}

	render() {
		return (
			<div className="App">
				<nav className="navigation">
					<NavLink to="/">Home</NavLink>
					<NavLink to="/add">Add Smurf</NavLink>
				</nav>
				<Route
					path="/add"
					component={this.withProps(SmurfForm, { addHandler: this.addSmurfHandler.bind(this) })}
				/>
				<Route
					exact
					path="/"
					component={this.withProps(Smurfs, {
						smurfs: this.state.smurfs,
						deleteSmurf: this.deleteSmurf.bind(this),
					})}
				/>
			</div>
		);
	}
}

export default App;
