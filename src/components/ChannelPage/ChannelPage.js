import React from 'react';
import Message from '../Message/Message'
import axios from 'axios'
import MessageBox from '../MessageBox/MessageBox'


class ChannelPage extends React.Component {
    constructor(props) {
        super(props)
        this.channelHandleChange = this.channelHandleChange.bind(this);
        this.addChannel = this.addChannel.bind(this);
        this.enterChannel = this.enterChannel.bind(this)
    }

    state = {
        inputValue: '',
        channels: [],
        selectedChannelID: '',
        selectedChannelName: '',
        messages: [],
        channelError: '',
        active: false,
        userIsTyping: false,
        typingMessage: ''
    };

    componentDidMount() {
        if (this.props.loggedIn) {
            this.getChannels()
            this.scrollToBottom();
        }
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    channelHandleChange(event) {
        this.setState({ inputValue: event.target.value })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    setUserIsTyping = (isTyping, data) => {
        this.setState({ userIsTyping: isTyping, typingMessage: data })
    }

    getChannels() {
        axios({
            method: 'get',
            url: '/user/' + this.props.userID,
        }).then((data) => {
            if (data) {
                let channelsArray = [];
                data.data.channels.forEach(channel => {
                    channelsArray.push(channel)
                });
                this.setState({ channels: channelsArray });
            }
        })
    }

    addChannel(event) {
        event.preventDefault();
        if (this.state.inputValue.length < 4 || this.state.inputValue.length > 20) {
            this.setState({ channelError: 'channel name must be between 4-20 characters' })
        }
        else {
            let userID = this.props.userID
            let channel = {
                "channelName": this.state.inputValue,
                "messages": [],
                "userID": userID
            }
            axios({
                method: 'post',
                url: '/api/channel',
                data: channel
            }).then((data) => {
                let channelsArray = this.state.channels;
                channelsArray.push(data)
                this.setState({ channels: channelsArray, inputValue: '', channelError: '' });
                this.getChannels();
            })
        }
    }

    enterChannel = (channelID, channelName) => {
        this.setState({ selectedChannelID: channelID, selectedChannelName: channelName, active: true })
        
        axios.get('/api/messages/' + channelID).then((response) => {
        
            if (response.data.length === 0) {
                this.setState({ messages: [{ messageBody: 'This is the beginning of the conversation...' }] })
            }
            else {
                // let message = {
                //     channelID: response.data.channelID,
                //     channelName: response.data.channelName,
                //     messageBody: response.data.messageBody,
                //     sender: response.data.sender
                // }
                this.setState({ messages: response.data })
            }
        })
        this.props.setAppState(channelID, channelName)
        //}, 2000)
    }



    setChannelState = (message) => {
        this.state.messages.push(message)
        this.setState({ messages: this.state.messages })
    }

    deleteChannel = channelID => {
        let remainingChannels = this.state.channels.filter((channel) => {
            return channel._id !== channelID;
        })
        this.setState({ channels: remainingChannels, messages: [] })
        this.props.setAppState('', '')
        axios.delete('/api/channel/' + channelID)
            .then(function (response) {
            })
    }

    render() {

        return (
            <div>

                <div className="sidenav">
                    <h4>Add a Channel</h4>
                    <div id="channel-error">{this.state.channelError}</div>
                    <form onSubmit={this.addChannel} id="add-channel-div">
                        <input className="inp " style={{ padding: 8 }}
                            value={this.state.inputValue}
                            type="text"
                            placeholder="enter channel here"
                            onChange={this.channelHandleChange}>
                        </input>

                        <button className='bttn'>+</button>
                    </form>

                    {this.state.channels.length ? <h4 id="existing-channels">Existing Channels</h4> : ''}

                    <ul id="sidenav-ul">
                        {this.state.channels.map(channel => (
                            <div className={'channel-group'}>
                                <li onClick={() => this.enterChannel(channel._id, channel.channelName)}
                                    key={channel._id}>{channel.channelName}
                                </li>
                                <button onClick={() => this.deleteChannel(channel._id)} className="channel-delete">x</button>
                            </div>
                        ))}
                    </ul>
                </div>
                <div id="message-output" className="content">
                    {this.state.messages.map(message => (
                        <Message
                         userIsTyping={this.state.userIsTyping} 
                         keyID={message._id} 
                         sender={message.sender} 
                         text={message.messageBody} />
                    ))}
                    {this.state.userIsTyping ? <div id="typing-message">{this.state.typingMessage}</div> : ''}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <div className="footer">
                    <MessageBox
                        userID={this.props.userID}
                        user={this.props.user}
                        selectedChannelID={this.state.selectedChannelID}
                        selectedChannelName={this.state.selectedChannelName}
                        setChannelState={this.setChannelState}
                        setUserIsTyping={this.setUserIsTyping}
                        userIsTyping={this.state.userIsTyping} />
                </div>
            </div>
        )
    }
}

export default ChannelPage;