import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [validated, setValidated] = useState('');
	const [login, setLogin] = useState('');

	const handleSubmit = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			setValidated(true);
			setLogin(null);
			return;
		}

		e.preventDefault();

		// Send request to server for authentication
		axios
			.post(`https://bchanmyflix.herokuapp.com/login`, {
				Username: username,
				Password: password,
			})
			.then((response) => {
				const data = response.data;

				if (!response.data.user) {
					setLogin(true);
				} else {
				props.onLoggedIn(data);
				}
			})
			.catch((e) => {
				console.log(e);
				// alert('User does not exist')
			});
	};

	const setLoginUsername = (e) => {
		setUsername(e.target.value);
		setLogin(null);
	};

	const setLoginPassword = (e) => {
		setPassword(e.target.value);
		setLogin(null);
	};

	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form">
			<Container>
				<Col className="text-center">
					<Form.Label>
						<h1 className="form-title">Login to myFlix</h1>
					</Form.Label>
				</Col>
			</Container>
			<Container>
				<Form.Group controlId="formBasicUsername">
					<Form.Label className="form-label">Username</Form.Label>
					<Form.Control className="form-input" type="text" value={username} onChange={(e) => setLoginUsername(e)} placeholder="Enter Username" required pattern="[a-zA-Z0-9]{6,}" />
					<Form.Control.Feedback type="invalid">Please enter a valid username with at least 6 alphanumeric characters.</Form.Control.Feedback>
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
						<Link to={`/register`}>
							<Button block className="login-view-button">
								Register As New User
							</Button>
						</Link>
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
