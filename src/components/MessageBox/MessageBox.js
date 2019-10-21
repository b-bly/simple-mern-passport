import React from 'react'
import './MessageBox.css'
import axios from 'axios'
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:8080");

socket.on('chat', function (msg) {
  console.log(msg)
})

class MessageBox extends React.Component {
  constructor(props) {
    super(props)
    this.messageHandleChange = this.messageHandleChange.bind(this)
  }

  state = {
    messageBoxVal: ''
  }

  messageHandleChange(event) {
    this.setState({ messageBoxVal: event.target.value })
  }

  sendMessage = (event) => {
    event.preventDefault();
    if (this.props.selectedChannelID === '') {
      console.log('enter a channel')
    }
    else if (this.state.messageBoxVal === '') {
      console.log('enter a message')
    }
    else {
      let message = {
        'channelName': this.props.selectedChannelName,
        'sender': this.props.user,
        'channelID': this.props.selectedChannelID,
        'messageBody': this.state.messageBoxVal
      }

      socket.emit('chat', message)
      this.props.setChannelState(message)

      // axios({
      //   method: 'post',
      //   url: '/api/messages/' + this.state.selectedChannelID,
      //   data: message
      // }).then((response) => {
      //   // console.log(response)
      //   this.setState({ messageBoxVal: '' })
      // })
    }
  }

  render() {
    return (

      <form id="message-box" className="fixed-bottom" onSubmit={this.sendMessage}>
        <div id="input-and-button" className="input-group mb-3 mx-auto">
          <input onChange={this.messageHandleChange} value={this.state.messageBoxVal} id="message-input" type="text" className="form-control" placeholder="enter message here" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <div id="send-div" className="input-group-append">
            <button id="send" className="btn" type="submit">Send</button>
          </div>
        </div>
      </form>
    )
  }

}

export default MessageBox