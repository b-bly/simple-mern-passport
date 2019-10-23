import React, { Component } from 'react';
import axios from 'axios'
import { Route } from 'react-router-dom'
import './components/ChannelPage/ChannelPage.css'
import { Redirect } from 'react-router-dom'
// components
import Signup from './components/SignUp/sign-up'
import LoginForm from './components/LoginForm/login-form'
import ChannelPage from './components/ChannelPage/ChannelPage'
import ChannelsNav from './components/ChannelsNav/ChannelsNav'

class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false,
      username: null,
      userID: null,
      selectedChannelID: '',
      selectedChannelName: '',
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

  redirect() {
    return (<Redirect to="/" />);
  }

  setAppState = (channelID, channelName) => {
    this.setState({ selectedChannelID: channelID, selectedChannelName: channelName })
  }

  getUser() {
    axios.get('/user/').then(response => {
      if (response.data.user) {

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          userID: response.data.user._id
        })
      } else {
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

        <Route
          exact path="/"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
              loggedIn={this.state.loggedIn}
            />}
          />
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
            <Signup updateUser={this.updateUser} />}
        />
        {/* route for channels */}
        <Route
          path="/channels"
          render={() =>
            //render channels
            <div>
              <ChannelsNav selectedChannelID={this.state.selectedChannelID} selectedChannelName={this.state.selectedChannelName} updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
              <ChannelPage setAppState={this.setAppState} updateUser={this.updateUser} loggedIn={this.state.loggedIn} userID={this.state.userID} user={this.state.username} />
            </div>
          }
        />
      </div>
    );
  }
}

export default App;
