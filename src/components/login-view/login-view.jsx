import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		// Send request to server for authentication
		axios.post('https://bchanmyflix.herokuapp.com/login', {
			Username: username,
			Password: password,
		})
		.then(response => {
			const data = response.data;
			props.onLoggedIn(data);
		})
		.catch(e => {
			console.log('User does not exist');
			// alert('User does not exist')
		});
	};

	const { onNewUser } = props;

	return (
		<Form className="login-form">
			<Container>
				<Col className="text-center">
					<Form.Label>
						<h1 className="form-title">Login to myFlix</h1>
					</Form.Label>
				</Col>
			</Container>
			<Container>
				<Form.Group controlId="formUsername">
					<Form.Label className="form-label">Username</Form.Label>
					<Form.Control className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
				</Form.Group>
				<Form.Group controlId="formPassword">
					<Form.Label className="form-label">Password</Form.Label>
					<Form.Control className="form-input" type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
				</Form.Group>
				<Form.Row>
					<Col xs={6}>
						<Button className="login-view-button" block type="submit" onClick={handleSubmit}>
							Log In
						</Button>
					</Col>
					<Col xs={6}>
						<Button className="login-view-button" block onClick={onNewUser}>
							Register As New User
						</Button>
					</Col>
				</Form.Row>
			</Container>
		</Form>
	);
}
LoginView.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
	}),
	onLoggedIn: PropTypes.func.isRequired,
};
