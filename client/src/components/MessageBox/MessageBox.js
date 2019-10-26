import React from 'react'
import './MessageBox.css'
import io from 'socket.io-client';
import { subscribeToChat, listenForTyping } from '../../api'
const socket = io("http://localhost:8080");




class MessageBox extends React.Component {
  constructor(props) {
    super(props)
    this.messageHandleChange = this.messageHandleChange.bind(this)
    
    subscribeToChat((err, msg) => {
      this.props.setChannelState(msg)
      this.props.setUserIsTyping(false, '')
    })

    listenForTyping((err, data) => {
      this.props.setUserIsTyping(true, data)
    })
  }

  state = {
    messageBoxVal: ''
  }

  messageHandleChange = event => {
    this.setState({ messageBoxVal: event.target.value })
    if (this.state.messageBoxVal.length > 1) {
      socket.emit('typing', `${this.props.user} is typing...`)
    }
    else {
      this.props.setUserIsTyping(false, '')
    }
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

      socket.emit('msg', message)
      this.props.setUserIsTyping(false, '')
      this.setState({ messageBoxVal: '' })
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