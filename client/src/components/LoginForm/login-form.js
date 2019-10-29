import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import './login-form.css'

class LoginForm extends Component {
    constructor(props) {
        super(props)
       
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
  
    }

    state = {
        username: '',
        password: '',
        IncorrectInfo: ''
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        axios
            .post('/user/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                if (response.status === 200) {
                    // update App.js state
                    this.props.updateUser({
                        loggedIn: true,
                        username: response.data.username,
                        userID: response.data.userID
                    })
                }
                
            }).catch(error => {
                this.setState({IncorrectInfo: 'Incorrect username or password.'})
            })
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to={'/channels'} />
        } else {
            return (
                <div className="mt-5">
                    <h4>Login</h4>
                    <div>
                        New here? <Link to="/signup">Sign Up</Link>
                    </div>
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
                            <p style={{color: "red"}}>{this.state.IncorrectInfo}</p>
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7" id="col7"></div>
                            <button
                                id="login"
                                className="btn btn-primary col-1 col-mr-auto"
                                onClick={this.handleSubmit}
                                type="submit">Login</button>
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

export default LoginForm
