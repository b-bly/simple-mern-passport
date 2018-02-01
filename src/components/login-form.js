import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		this.props.login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="SignupForm">
				<h4>Login</h4>
				<form className="form-horizontal">
					<div className="form-group">
						<div className="col-1 col-ml-auto">
							<label className="form-label" htmlFor="username">Username</label>
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
						<button className="btn btn-primary col-1 col-mr-auto" onClick={this.handleSubmit}>Sign up</button>
					</div>
				</form>
			</div>
			)
		}
	}
}

export default LoginForm
