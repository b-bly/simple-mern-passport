import React from 'react'
import './MessageBox.css'
import axios from 'axios'
import openSocket from "socket.io-client";

const socket = openSocket("http://localhost:8080");

// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }

// export { subscribeToTimer };

socket.on('chat', function(msg){
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

  sendMessage = () => {
    let message = {
      'channelName': this.props.selectedChannelName,
      'sender': this.props.userID,
      'channelID': this.props.selectedChannelID,
      'messageBody': this.state.messageBoxVal
    }
    socket.emit('chat',message) 
    this.props.setChannelState(message)   
     
    
   
    axios({
      method: 'post',
      url: '/api/messages/' + this.state.selectedChannelID,
      data: message
    }).then((response) => {
      // console.log(response)
      this.setState({ messageBoxVal: '' })
    })
  }

  render() {
    return (

      <div id="message-box" className="fixed-bottom" >

        <div id="input-and-button" className="input-group mb-3 mx-auto">
          <input onChange={this.messageHandleChange} value={this.state.messageBoxVal} id="message-input" type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <div id="send-div" className="input-group-append">
            <button onClick={this.sendMessage} id="send" className="btn" type="button">Send</button>
          </div>
        </div>

      </div>
    )
  }

}

export default MessageBox