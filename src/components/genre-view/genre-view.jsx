import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './genre-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export class GenreView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { genre } = this.props;

		// if (!genre) return <div className="main-view" />;
		if (!genre) return null;

		return (
			<div className="genre-view">
				<Container>
					<Row>
						<Card className="genre-details-card">
							<Card.Title className="genre-name">{genre.Name}</Card.Title>
							<Card.Text className="genre-description">{genre.Description}</Card.Text>
							<br></br>
							<ListGroup variant="flush" className="card-button">
								<ListGroup.Item>
									<Link to={`/`}>
										<Button className="back-to-main-button">Back to Movies</Button>
									</Link>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Row>
				</Container>
			</div>
		);
	}
}

GenreView.propTypes = {
	Genre: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Description: PropTypes.string.isRequired,
	}).isRequired,
};
