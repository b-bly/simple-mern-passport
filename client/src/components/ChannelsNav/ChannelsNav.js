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

    state = {
        inputVal: '',
        inviteMessage: '',
        inviteMessageClass: ''
    }

    handleChange = event => {
        this.setState({ inputVal: event.target.value })
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

    inviteUser = event => {
        event.preventDefault();
        let username = this.state.inputVal;
        axios.get('/user/invite/' + username + '/' + this.props.selectedChannelID)
        .then((response) => {
            if(response.data.status === 200) {
                this.setState({ 
                    inviteMessage: `Successfully added ${this.state.inputVal} to the channel`, 
                    inputVal: '', 
                    inviteMessageClass: 'green'
                 })
                 setTimeout(() =>{this.setState({inviteMessageClass: '', inviteMessage: ''})}, 3000)
            }
            else {
                this.setState({ 
                    inviteMessage: `Failed to add ${this.state.inputVal} to the channel`, 
                    inviteMessageClass: 'red' 
                })
            }
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;
        if (!loggedIn) {
            return (<Redirect to="/" />);
        }

        return (
            <div>
                <header className="channels-navbar App-header" id="nav-container">
                    

                    <div className="nav-info mx-auto">
                        <div id="top-filler"></div>
                        <h1 className="App-title">ChatSpace</h1>
                        <h4 id="current-channel">{this.props.selectedChannelName}</h4>
                        {this.props.selectedChannelName ?
                            <div>
                                <h5>Invite a friend:</h5>
                                <form onSubmit={this.inviteUser}>
                                    <input 
                                        onChange={this.handleChange} 
                                        value={this.state.inputVal} 
                                        className="w3-transparent w3-text-white" 
                                        id="invite-input" 
                                        type="text" 
                                        placeholder='their username'>
                                    </input>
                                    <button className="w3-hover-opacity" id="invite-button" type="submit">Invite</button>
                                </form>
                                <div className={this.state.inviteMessageClass} id="invite-response">{this.state.inviteMessage}</div>
                            </div>
                            : ''}
                    </div>
                    <div className="logout-button-div" >
                        {loggedIn ? (
                            <section className="">
                                <button id="logout-button" className="w3-text-white w3-padding w3-border w3-round w3-hover-opacity" onClick={this.logout}>
                                    <span>Log Out</span>
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
                </header>
            </div>
        );

    }
}

export default Navbar