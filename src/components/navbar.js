import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'

class Navbar extends Component {
	constructor(props) {
		super(props);
		
	}
	render() {
		const loggedIn = this.props.loggedIn;
		console.log('navbar render, props: ')
		console.log(this.props);
		return (
			<div>
				<header className="navbar">
					{loggedIn ? (
						<section className="navbar-section">
							<Link to="#" className="btn btn-link" onClick={this.props.logout}>
								Logout</Link>
						
						</section>
					) : (
							<section className="navbar-section">
								<Link to="/" className="btn btn-link">
									Home</Link>
								<Link to="/login" className="btn btn-link">
									login
				</Link>
								<Link to="/signup" className="btn btn-link">
									sign up
				</Link>
							</section>
						)}
				</header>
			</div>

		);

	}
}

export default Navbar