import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './director-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export class DirectorView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { director } = this.props;

		if (!director) return null;

		return (
			<div className="director-view">
				<Container>
					<Row>
						<Card className="director-details-card">
							<Card.Title className="director-name">{director.Name}</Card.Title>
							<Card.Text className="director-bio director-details">{director.Bio}</Card.Text>
							<ListGroup variant="flush" className="card-content">
								<ListGroup.Item className="director-yob director-details">
									<span className="label">Birth Year</span>
									<br></br>
									{director.Birth}
									<br></br>
								</ListGroup.Item>
							</ListGroup>
							<Link to={`/`}>
								<Button className="back-to-main-button">Back to Movies</Button>
							</Link>
						</Card>
					</Row>
				</Container>
			</div>
		);
	}
}

DirectorView.propTypes = {
	Director: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Bio: PropTypes.string.isRequired,
		Birth: PropTypes.string.isRequired,
		Death: PropTypes.string,
	}).isRequired,
};
