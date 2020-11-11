import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

// import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// const [onNewUser] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		props.onLoggedIn(username);
	};

	const { onNewUser } = props;

	return (
		<Form className="login-form">
			<Form.Label>
				<h2>Login to myFlix</h2>
			</Form.Label>
			<Form.Group controlId="formUsername">
				<Form.Label className="form-label">Username</Form.Label>
				<Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
			</Form.Group>
			<Form.Group controlId="formPassword">
				<Form.Label className="form-label">Password</Form.Label>
				<Form.Control type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
			</Form.Group>
			<Button className="login-button" type="submit" onClick={handleSubmit}>
				Submit
			</Button>

			 <Button onClick={onNewUser}>Or Register As a New User Here</Button>
		</Form>

		// </Col>
	);
}
LoginView.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
	}),
	onLoggedIn: PropTypes.func.isRequired,
};
