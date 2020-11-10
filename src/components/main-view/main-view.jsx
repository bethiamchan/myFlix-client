import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
	constructor() {
		//Call superclass constructor so React can initialize it
		super();

		//Initialize state to an empty object
		this.state = {
			movies: null,
			selectedMovie: null,
			user: null,
			// newUser: null,
		};
		this.onBack = this.onBack.bind(this);
	}

	componentDidMount() {
		axios
			.get('https://bchanmyflix.herokuapp.com/movies')
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	//When a movie is clicked, this updates the state of the selectedMovie property to the movie that was clicked
	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}

	//When user logs in, this updates the user property in state to that user
	onLoggedIn(user) {
		this.setState({
			user,
		});
	}

	onBack() {
		this.setState({
			selectedMovie: null,
		});
	}

	// onNewUser() {
	// 	this.setState({
	// 		newUser: true,
	// 	});
	// }

	render() {
		const { movies, selectedMovie, user } = this.state;

		// If user is not logged in, the LoginView is rendered. If a user is logged in, user details are passed as a prop to LoginView
		if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

		// if (newUser) return <RegistrationView onNewUser={this.onNewUser} />

		//Before movies have been loaded
		if (!movies) return <div className="main-view" />;

		return (
			<div className="main-view">
				<Container>
					<Row>
						{/* If state of selectedMovie is not null, selected move will be returned. Otherwise, all movies are returned. */}
						{selectedMovie ? (
							<MovieView movie={selectedMovie} onBack={this.onBack} />
						) : (
							movies.map((movie) => (
								<Col>
									<MovieCard key={movie._id} movie={movie} onClick={(movie) => this.onMovieClick(movie)} />
								</Col>
							))
						)}
					</Row>
				</Container>
			</div>
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
