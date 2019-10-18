import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import './sign-up.css'


class Signup extends Component {
	constructor() {
		super()
		
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	state = {
		username: '',
		password: '',
		confirmPassword: '',
		redirectTo: null
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		console.log('sign-up handleSubmit, username: ')
		console.log(this.state.username)
		event.preventDefault()

		//request to server to add a new username/password
		axios.post('/user/', {
			username: this.state.username,
			password: this.state.password
		})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					console.log('successful signup')
					console.log(response)
					this.setState({ //redirect to channels page
						redirectTo: '/login'
					})

				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="SignupForm mt-5">
					<h4>Sign up</h4>
					<form className="form-horizontal">
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="username">Username: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									type="text"
									id="username"
									name="username"
									placeholder="Username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="password">Password: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="password"
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group ">
							<div className="col-7"></div>
							<button
								className="btn btn-primary col-1 col-mr-auto"
								onClick={this.handleSubmit}
								type="submit"
							>Sign up</button>
						</div>
					</form>
					<div>
                        <img src="https://media.giphy.com/media/BrT2h4G7ldP6U/giphy.gif" style={{marginTop:50}} alt="Sign" width="300" height="225"></img>
                    </div>
				</div>

			)
		}
	}
}

export default Signup
