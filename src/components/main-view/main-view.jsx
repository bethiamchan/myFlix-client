import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
	constructor() {
		//Call superclass constructor so React can initialize it
		super();

		//Initialize state to an empty object
		this.state = {
			movies: null,
			selectedMovie: null,
		};
	}

	componentDidMount() {
		axios
			.get('https://bchanmyflix.herokuapp.com/movies')
			.then((response) => {
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (errror) {
				console.log(error);
			});
	}

	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}

	render() {
		const { movies, selectedMovie } = this.state;

		if (!movies) return <div className="main-view" />;

		return <div className="main-view">{selectedMovie ? <MovieView movie={selectedMovie} /> : movies.map((movie) => <MovieCard key={movie._id} movie={movie} onClick={(movie) => this.onMovieClick(movie)} />)}</div>;
	}
}