import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './profile-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Tabs, Tab } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

export class ProfileView extends React.Component {
	constructor() {
		super();
		(this.Username = null), (this.Password = null), (this.Email = null), (this.Birthday = null);
		this.state = {
			Username: null,
			Password: null,
			Email: null,
			Birthday: null,
			FavoriteMovies: [],
			validated: null,
		};
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.getUser(accessToken);
		}
	}

	getUser(token) {
		let username = localStorage.getItem('user');
		axios
			.get(`https://bchanmyflix.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.data.Birthday,
					FavoriteMovies: response.data.FavoriteMovies,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleRemoveFavorite(e, movie) {
		e.preventDefault();

		const username = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		axios
			.delete(`https://bchanmyflix.herokuapp.com/users/${username}/Movies/${movie}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				alert('Movie removed from favorites');
				window.open('_self');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	handleUpdate(e, newUsername, newEmail, newBirthday) {
		this.setState({
			validated: null,
		});

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			this.setState({
				validated: true,
			});
			return;
		}
		e.preventDefault();

		const token = localStorage.getItem('token');

		axios

			.put(`https://bchanmyflix.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
				data: {
					Username: newUsername ? newUsername : this.state.Username,
					Password: this.Password,
					Email: newEmail ? newEmail : this.state.Email,
					Birthday: newBirthday ? newBirthday : this.state.Birthday,
				},
			})
			.then((response) => {
				alert('Saved Changes');
				this.setState({
					Username: response.data.Username,
					Password: response.data.Password,
					Email: response.data.Email,
					Birthday: response.data.Birthday,
				});
				localStorage.setItem('user', this.state.Username);
				window.open('/client/users/${username}', '_self');
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	setUsername(input) {
		this.Username = input;
	}

	setPassword(input) {
		this.Password = input;
	}

	setEmail(input) {
		this.Email = input;
	}

	setBirthday(input) {
		this.Birthday = input;
	}

	handleDeregister(e) {
		e.preventDefault();

		const token = localStorage.getItem('token');
		const username = localStorage.getItem('user');

		axios
			.delete(`https://bchanmyflix.herokuapp.com/users/${username}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				alert('Your account has been deleted');
				window.open('/', '_self');
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { Email, Birthday, FavoriteMovies, validated } = this.state;
		const username = localStorage.getItem('user');
		const { movies } = this.props;

		return (
			<Container className="profile-view">
				<Tabs defaultActiveKey="profile" transition={false} className="profile-tabs">
					<Tab className="tab-item" eventKey="profile" title="Profile">
						<Card className="profile-card">
							<h1 className="profile-title">{username}'s Profile</h1>
							<Card.Body>
								<Card.Text className="profile-item label">Favorite Movies:</Card.Text>
								{FavoriteMovies.length === 0 && <div className="card-content">You have no favorite movies.</div>}

								<div className="favorites-container">
									<ul className="favorites-list">
										{FavoriteMovies.length > 0 &&
											movies.map((movie) => {
												if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
													return (
														<li className="favorites-item card-content" key={movie._id}>
															{movie.Title}
															<Button size="sm" className="profile-button remove-favorite" onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>
																Remove
															</Button>
														</li>
													);
												}
											})}
									</ul>
								</div>
								<div>
									<ListGroup variant="flush" className="card-button">
										<ListGroup.Item className="button-container">
											<Row>
												<Link to={`/`}>
													<Button className="profile-button">Back to Movies</Button>
												</Link>
												<Button className="profile-button" onClick={(e) => this.handleDeregister(e)}>
													Delete Profile
												</Button>
											</Row>
										</ListGroup.Item>
									</ListGroup>
								</div>
							</Card.Body>
						</Card>
					</Tab>
					<Tab className="tab-item" eventKey="update" title="Update">
						<Card className="update-card">
							<h1 className="profile-title">Update Profile</h1>
							<Card.Body>
								<Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
									<Form.Group controlId="formBasicUsername">
										<Form.Label className="form-label">Username</Form.Label>
										<Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} pattern="[a-zA-Z0-9]{6,}" />
										<Form.Control.Feedback type="invalid">Please enter a valid username with at least 6 alphanumeric characters.</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="formBasicPassword">
										<Form.Label className="form-label">Password</Form.Label>
										<Form.Control type="password" placeholder="Change Password" onChange={(e) => this.setPassword(e.target.value)} pattern=".{6,}" />
										<Form.Control.Feedback type="invalid">Please enter a valid password with at least 6 characters.</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="formBasicEmail">
										<Form.Label className="form-label">Email</Form.Label>
										<Form.Control type="email" placeholder="Change Email" defaultValue={Email} onChange={(e) => this.setEmail(e.target.value)} />
										<Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
									</Form.Group>
									<Form.Group controlId="formBasicBirthday">
										<Form.Label className="form-label">Birthday</Form.Label>
										<Form.Control type="date" placeholder="Change Birthday" defaultValue={Birthday} onChange={(e) => this.setBirthday(e.target.value)} />
										<Form.Control.Feedback type="invalid">Please enter a valid birthday.</Form.Control.Feedback>
									</Form.Group>
									<Button className="update profile-button" type="submit" size="sm">
										Update
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

ProfileView.propTypes = {
	user: PropTypes.shape({
		FavoriteMovies: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string.isRequired,
				Title: PropTypes.string.isRequired,
			})
		),
		Username: PropTypes.string.isRequired,
		Email: PropTypes.string.isRequired,
		Birthday: PropTypes.string.isRequired,
	}),
};
