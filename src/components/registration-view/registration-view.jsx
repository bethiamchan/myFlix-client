import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

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
		<div className="registration-view">
			<h2>Create Your myFlix Account</h2>

			<Form className="registration-form">
				<Form.Row>
					<Col xs={1}>
						<Form.Label>Username</Form.Label>
					</Col>
					<Col xs={4}>
						<Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
					</Col>
					<Col xs={1}>
						<Form.Label>Password</Form.Label>
					</Col>
					<Col xs={4}>
						<Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
					</Col>
				</Form.Row>
				<Form.Row>
					<Col xs={1}>
						<Form.Label>Email</Form.Label>
					</Col>
					<Col xs={4}>
						<Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" />
					</Col>
					<Col xs={1}>
						<Form.Label>Birthday</Form.Label>
					</Col>
					<Col xs={4}>
						<Form.Control type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="Enter Birthday" />
					</Col>
					<Col xs={2}>
						<Button className="login-button" type="submit" onClick={handleRegister}>
							Register
						</Button>
					</Col>
				</Form.Row>
			</Form>
		</div>
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
