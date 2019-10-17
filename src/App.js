import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import './components/ChannelPage/ChannelPage.css'
// components
import Signup from './components/SignUp/sign-up'
import LoginForm from './components/LoginForm/login-form'
import Navbar from './components/Navbar/navbar'
import Home from './components/Home/home'
import ChannelPage from './components/ChannelPage/ChannelPage'
import ChannelsNav from './components/ChannelsNav/ChannelsNav'

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

  updateUser(userObject) {
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

        {/* <Navbar username={this.state.username} updateUser={this.updateUser} loggedIn={this.state.loggedIn} /> */}
        {/* greet user if logged in: */}
        {/* Routes to different components */}
        <Route
          exact path="/"
          render={() =>
            <div>
              <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
              <Home loggedIn={this.state.loggedIn} />
            </div>
          } />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
              loggedIn={this.state.loggedIn}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup />}
        />
        {/* route for channels */}
        <Route
          path="/channels"
          render={() =>
            //render channels
            <div>
            <ChannelsNav updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
            <ChannelPage updateUser={this.updateUser} loggedIn={this.state.loggedIn} user={this.state.username} />
            </div>
          }
        />
      </div>
    );
  }
}

export default App;
