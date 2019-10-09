import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import './components/ChannelPage/ChannelPage.css'
// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'
import ChannelPage from './components/ChannelPage/ChannelPage'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
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

  render() {
    return (
      <div className="App">
   
        <Navbar username={this.state.username} updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {/* Routes to different components */}
        <Route
          exact path="/"
          render={() =>
            <Home loggedIn={this.state.loggedIn}></Home>
          } />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />
        {/* route for channels */}
        <Route
          path="/channels"
          render={() =>
            //render channels
            <ChannelPage loggedIn={this.state.loggedIn} user={this.state.username}/>}
        />
      </div>
    );
  }
}

export default App;
