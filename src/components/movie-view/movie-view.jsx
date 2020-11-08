import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MovieView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { movie } = this.props;

		if (!movie) return null;

		return (
			<div className="movie-view">
				<Row>
					<Col xs={3}>
						<img className="movie-poster" src={movie.ImagePath} />
					</Col>
					<Col xs={9}>
						<div className="movie-title">
							<span className="label">Title: </span>
							<span className="value">{movie.Title}</span>
						</div>
						<div className="movie-description">
							<span className="label">Description: </span>
							<span className="value">{movie.Description}</span>
						</div>
						<div className="movie-genre">
							<span className="label">Genre: </span>
							<span className="value">{movie.Genre.Name}</span>
						</div>
						<div className="movie-director">
							<span className="label">Director: </span>
							<span className="value">{movie.Director.Name}</span>
						</div>
					</Col>
				</Row>
				<div className="back-to-main-view">
					<button onClick={() => window.open('mainView', '_self')} className="back-button">
						Back
					</button>
				</div>
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
