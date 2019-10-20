import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../../App.css';
import './ChannelsNav.css';
import axios from 'axios'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }

        }).catch(error => {
            console.log('Logout error')
            console.log(error)
        })

    }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        if (!loggedIn) {
            return (<Redirect to="/" />);
        }
        
        return (
            <div>
                <header className="channels-navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <button id="logout-button" className="w3-text-white w3-padding w3-border w3-round w3-hover-opacity" onClick={this.logout}>
                                    <span>LOGOUT</span>
                                </button>

                                {/* <p>Join the party, {this.props.username}!</p> */}


                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">login</span>
                                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">sign up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                        <div id="top-filler"></div>
                        <h1 className="App-title">ChatSpace</h1>
                        <h4 id="current-channel">Current channel: {this.props.selectedChannelName}</h4>
                    </div>
                </header>
            </div>
        );
        
    }
}

export default Navbar