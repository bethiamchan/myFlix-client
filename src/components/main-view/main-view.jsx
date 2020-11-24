import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './main-view.scss';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';
import { Nav } from 'react-bootstrap';

export class MainView extends React.Component {
	constructor() {
		//Call superclass constructor so React can initialize it
		super();

		//Initialize state to an empty object
		this.state = {
			movies: [],
			user: null,
		};
		this.onLoggedIn = this.onLoggedIn.bind(this);
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.setState({
				user: localStorage.getItem('user'),
			});
			this.getMovies(accessToken);
		}
	}

	//Get all movies
	getMovies(token) {
		axios
			.get('https://bchanmyflix.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	//When user logs in, this updates the user property in state to that user
	onLoggedIn(authData) {
		console.log(authData);
		this.setState({
			user: authData.user.Username,
		});

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({
			user: null,
		});
	}

	render() {
		const { movies, user } = this.state;

		//Before movies have been loaded
		if (!movies) return <div className="main-view" />;
		const pathMovies = `/`;
		const pathProfile = `/users/${user}`;

		return (
			<Router>
				<div className="main-view">
					<Navbar expand="lg" className="navbar" sticky="top">
						<Navbar.Brand as={Link} to="/" className="navbar-brand">
							<h1 className="app-name">myFlix</h1>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
							<Nav.Link as={Link} to={pathMovies} className="link-text">
								Movies
							</Nav.Link>
							<Nav.Link as={Link} to={pathProfile} className="link-text">
								Profile
							</Nav.Link>
							<Nav.Link onClick={() => this.onLoggedOut()} as={Link} to={pathMovies} className="link-text">
								Log Out
							</Nav.Link>
						</Navbar.Collapse>
					</Navbar>

					<Route
						exact
						path="/"
						render={() => {
							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return movies.map((m) => <MovieCard key={m._id} movie={m} />);
						}}
					/>
					<Route path="/register" render={() => <RegistrationView />} />
					<Route path="/movies/:movieID" render={({ match }) => <MovieView movie={movies.find((m) => m._id === match.params.movieID)} />} />
					<Route
						exact
						path="/genres/:name"
						render={({ match }) => {
							if (!movies) return <div className="main-view" />;
							return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} />;
						}}
					/>

					<Route
						exact
						path="/directors/:name"
						render={({ match }) => {
							if (!movies) return <div className="main-view" />;
							return <DirectorView director={movies.find((m) => m.Director.Name === match.params.name).Director} />;
						}}
					/>

					<Route
						exact
						path="/users/:username"
						render={() => {
							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							if (movies.length === 0) return;
							return <ProfileView movies={movies} />;
						}}
					/>
				</div>
			</Router>
		);
	}
}

MainView.propTypes = {
	movie: PropTypes.arrayOf({
		_id: PropTypes.string.isRequired,
		Title: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
		Genre: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Description: PropTypes.string.isRequired,
		}),
		Director: PropTypes.shape({
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string.isRequired,
		}),
		ImagePath: PropTypes.string.isRequired,
		Featured: PropTypes.bool,
	}),
	user: PropTypes.string,
};
