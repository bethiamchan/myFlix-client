import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './main-view.scss';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { ProfileView } from '../profile-view/profile-view';

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

export class MainView extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		let user = localStorage.getItem('user');
		if (accessToken !== null) {
			this.props.setUser(user);
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
				this.props.setMovies(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	//When user logs in, this updates the user property in state to that user
	onLoggedIn(authData) {
		console.log(authData);
		this.props.setUser(authData.user.Username);

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	onLoggedOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.props.setUser(!user);
	}

	render() {
		let { movies, user } = this.props;

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
							return <MoviesList movies={movies} />;
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

let mapStateToProps = (state) => {
	return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

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
