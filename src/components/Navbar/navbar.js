import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        axios.post('/user/logout').then(response => {
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
           console.log(error)
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;

        return (
            <div>

                <header className="w3-bar w3-black sizeNav">
                    <div className="">
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                    <span className="text-secondary">logout</span></Link>
                                    {/* <p>Join the party, {this.props.username}!</p> */}

                            </section>
                        ) : (
                                <section className="">
                                    <div className="w3-container mt-3">
                                    <Link to="/login" className="w3-bar-item w3-button w3-border w3-round w3-text-white mr-3 w3-mobile">
                                        login
                                    </Link>
                                    <Link to="/signup" className="w3-bar-item w3-button w3-border w3-round w3-text-white w3-mobile">
                                        sign up
                                    </Link>
                                    <h1 className="w3-bar-item w3-mobile title App-title">ChatSpace</h1>
                                    </div> 
                                </section>
                            )}
                    </div>
                </header>
            </div>

        );

    }
}

export default Navbar




