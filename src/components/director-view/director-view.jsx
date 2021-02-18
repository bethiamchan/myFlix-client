import React from 'react';
import PropTypes from 'prop-types';

import './director-view.scss';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export class DirectorView extends React.Component {
	constructor(props) {
		super(props);

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
									<br />
									{director.Birth}
									<br />
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Row>
				</Container>
			</div>
		);
	}
}

DirectorView.propTypes = {
	director: PropTypes.shape({
		Name: PropTypes.string.isRequired,
		Bio: PropTypes.string.isRequired,
		Birth: PropTypes.string.isRequired,
		Death: PropTypes.string,
	}).isRequired,
};
