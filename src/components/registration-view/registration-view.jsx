import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export function RegistrationView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');
	const [validated, setValidated] = useState('');

	const handleRegister = (e) => {
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			setValidated(true);
			return;
		}
		e.preventDefault();

		axios
			.post(`https://bchanmyflix.herokuapp.com/users`, {
				Username: username,
				Password: password,
				Email: email,
				Birthday: birthday,
			})
			.then((response) => {
				const data = response.data;
				console.log(data);
				window.open('/', '_self');
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<Form className="registration-form" noValidate validated={validated} onSubmit={handleRegister}>
			<Container>
				<Col className="text-center">
					<Form.Label>
						<h1 className="form-title">Create Your myFlix Account</h1>
					</Form.Label>
				</Col>
			</Container>
			<Container>
				<Form.Group controlId="formUsername">
					<Form.Label className="form-label">
						Username<span className="required">*</span>
					</Form.Label>
					<Form.Control className="form-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" pattern="[a-zA-Z0-9]{6,}" required />
					<Form.Control.Feedback type="invalid">Please enter a valid username with at least 6 alphanumeric characters.</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="formPassword">
					<Form.Label className="form-label">
						Password<span className="required">*</span>
					</Form.Label>
					<Form.Control className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" pattern=".{6,}" required />
					<Form.Control.Feedback type="invalid">Please enter a valid password with at least 6 characters.</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="formEmail">
					<Form.Label className="form-label">
						Email<span className="required">*</span>
					</Form.Label>
					<Form.Control className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email Address" required />
					<Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="formBirthday">
					<Form.Label className="form-label">Birthday</Form.Label>
					<Form.Control className="form-input" type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder="Enter Birthday" />
					<Form.Control.Feedback type="invalid">Please enter a valid birthday.</Form.Control.Feedback>
				</Form.Group>
				<Form.Row>
					<Col xs={6}>
						<Button className="registration-button" block type="submit">
							Register
						</Button>
					</Col>
					<Col xs={6}>
						<Link to={`/`}>
							<Button block className="registration-button">
								Back to Login
							</Button>
						</Link>
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
		birthday: PropTypes.string,
	}),
};
