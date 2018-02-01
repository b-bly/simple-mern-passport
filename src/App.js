import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }
    this.logout = this.logout.bind(this)
    this.login = this.login.bind(this)
    this.getUser = this.getUser.bind(this)
    this.signup = this.signup.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    //this.getUser()
  }
  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  signup(username, password) {

    //request to server here
    axios.post('/user/', {
      username: username,
      password: password
    })
      .then(response => {
        console.log(response)
        if (!response.data.errmsg) {
          console.log('successful signup')
          this.setState({
            redirectTo: '/login'
          })
        } else {
          console.log('username already taken')
        }
      })
  }

  logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  login(username, password) {
    axios
      .post('/user/login', {
        username,
        password
      })
      .then(response => {
        console.log('login response: ')
        console.log(response)
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            username: response.data.username
          })
        }
      })
  }
  render() {
    return (
      <div className="App">
        <h1>MERN Passport</h1>


        <Navbar logout={this.logout} loggedIn={this.state.loggedIn} />
        <hr></hr>
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Welcome {this.state.username}</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              login={this.login}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup
              signup={this.signup}
            />}
            />

			</div>
		);
	}
}

export default App;
