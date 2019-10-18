import React from 'react'
import './MessageBox.css'
import axios from 'axios'


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
    axios({
      method: 'post',
      url: '/api/messages/' + this.state.selectedChannelID,
      data: message
    }).then((response) => {
      console.log(response)
      this.props.setChannelState(response.data)
    })
  }

  render() {
    return (

      <div id="message-box" className="fixed-bottom" >

        <div id="input-and-button" className="input-group mb-3 mx-auto">
          <input onChange={this.messageHandleChange} value={this.state.messageBoxVal} id="message-input" type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <div id="send-div" className="input-group-append">
            <button onClick={this.sendMessage} id="send" className="btn w3-blue" type="button">Send</button>
          </div>
        </div>

      </div>
    )
  }

}

export default MessageBox