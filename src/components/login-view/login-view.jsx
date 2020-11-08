import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

// import { RegistrationView } from '../registration-view/registration-view';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		props.onLoggedIn(username);
	};

	return (
		<Form className="login-form">
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
				<Col xs={2}>
					<Button className="login-button" type="submit" onClick={handleSubmit}>
						Submit
					</Button>
				</Col>
			</Form.Row>
			{/* <Form.Row>
				<Col>
					<Button onClick={() => window.open('RegistrationView', '_self')}>Or Register As a New User Here</Button>
				</Col>
			</Form.Row> */}
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
