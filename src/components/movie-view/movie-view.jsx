import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './movie-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export class MovieView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	handleAddFavorite(e, movie) {
		e.preventDefault();
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');
		axios
			.post(`https://bchanmyflix.herokuapp.com/users/${username}/movies/${movie._id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				alert('Movie has been added to your favorites.');
				// window.open('_self');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		const { movie } = this.props;

		if (!movie) return null;

		return (
			<div className="movie-view">
				<Container>
					<Row>
						<Card className="movie-poster-card">
							<img className="movie-poster" alt="Movie Poster Image" src={movie.ImagePath} />
						</Card>

						<Card className="movie-details-card">
							<Card.Title className="movie-title">{movie.Title}</Card.Title>
							<Card.Text className="movie-description card-content">{movie.Description}</Card.Text>
							<div className="favorites-button-container">
								<Button className="movie-view-button favorites-button" value={movie._id} onClick={(e) => this.handleAddFavorite(e, movie)}>
									Add to Favorites
								</Button>
							</div>
							<br></br>
							<ListGroup variant="flush" className="card-content">
								<ListGroup.Item className="movie-genre">
									<span className="label">Genre</span>
									<br></br>
									{movie.Genre.Name}
									<br></br>
								</ListGroup.Item>
								<ListGroup.Item className="movie-director">
									<span className="label">Director</span>
									<br></br>
									{movie.Director.Name}
								</ListGroup.Item>
								<ListGroup.Item className="navigation-buttons">
									<Row>
										<Link to={`/genres/${movie.Genre.Name}`}>
											<Button className="movie-view-button" size="sm">
												Learn More About This Genre
											</Button>
										</Link>
										<Link to={`/directors/${movie.Director.Name}`}>
											<Button className="movie-view-button" size="sm">
												Learn More About This Director
											</Button>
										</Link>
									</Row>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Row>
				</Container>
			</div>
		);
	}
}

MovieView.propTypes = {
	movie: PropTypes.shape({
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
};
