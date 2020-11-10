import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import './movie-view.scss';

export class MovieView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	// onBack() {
	// 	this.setState({
	// 		selectedMovie: null,
	// 	});
	// }

	render() {
		const { movie, onBack } = this.props;

		if (!movie) return null;

		return (
			<div className="movie-view">
				<Container>
					<Row>
						<Col xs={3}>
							<img className="movie-poster" src={movie.ImagePath} />
						</Col>
						<Col xs={9}>
							<div className="movie-title">
								<span className="title">Title: </span>
								<span className="value">{movie.Title}</span>
							</div>
							<div className="movie-description card-content">
								<span className="label">Description: </span>
								<span className="value">{movie.Description}</span>
							</div>
							<div className="movie-genre card-content">
								<span className="label">Genre: </span>
								<span className="value">{movie.Genre.Name}</span>
							</div>
							<div className="movie-director card-content">
								<span className="label">Director: </span>
								<span className="value">{movie.Director.Name}</span>
							</div>
						</Col>
					</Row>
					<Row className="back-to-main-view">
						<Button onClick={() => window.open('mainView', '_self')} className="back-button">
							Back
						</Button>
						<button onClick={onBack} className="back-button">Back to Movies</button>
					</Row>
				</Container>
				{/* <div className="back-to-main-view">
					<Button onClick={() => window.open('mainView', '_self')} className="back-button">
						Back
					</Button> */}
				{/* <Button onClick={() => onBack()}>Back</Button> */}
				{/* </div> */}
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
