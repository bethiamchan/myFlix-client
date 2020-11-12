import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthDate, setBirthDate] = useState('');

	const handleRegister = (e) => {
		e.preventDefault();
		console.log(username, password, email, birthDate);
		props.onLoggedIn(username);
	};

	return (
		<Form className="registration-form">
			<Container>
				<Col className="text-center">
					<Form.Label>
						<h1 className="form-title">Create Your myFlix Account</h1>
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
					<Form.Control className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
				</Form.Group>
				<Form.Group controlId="formEmail">
					<Form.Label className="form-label">Email</Form.Label>
					<Form.Control className="form-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" />
				</Form.Group>
				<Form.Group controlId="formBirthDate">
					<Form.Label className="form-label">Birthday</Form.Label>
					<Form.Control className="form-input" type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="Enter Birthday" />
				</Form.Group>
				<Form.Row>
					<Col>
						<Button className="registration-button" block type="submit" onClick={handleRegister}>
							Register
						</Button>
					</Col>
				</Form.Row>
			</Container>
		</Form>
	);
}
RegistrationView.propTypes = {
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		password: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		birthDate: PropTypes.string,
	}),
};
