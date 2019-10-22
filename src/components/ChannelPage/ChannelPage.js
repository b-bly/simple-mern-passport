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
        active: false
    };

    componentDidMount() {
        if (this.props.loggedIn) {
            this.getChannels()
        }
    }
    channelHandleChange(event) {
        this.setState({ inputValue: event.target.value })
    }

    getChannels() {
        axios({
            method: 'get',
            url: '/user/' + this.props.userID,
        }).then((data) => {
            console.log(data)
            if (data) {
                console.log(data)
                let channelsArray = [];
                //console.log(data.data[0]);
                data.data.channels.forEach(channel => {
                    channelsArray.push(channel)
                });
                this.setState({ channels: channelsArray });
                console.log(this.state.channels)
            }
        })
    }

    addChannel(event) {
        event.preventDefault();
        if (this.state.inputValue.length < 4 || this.state.inputValue.length > 20) {
            this.setState({ channelError: 'channel name must be between 4-20 characters' })
        }
        else {
            console.log(this.props.userID)
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
                // console.log(data)
                this.setState({ channels: channelsArray, inputValue: '', channelError: '' });
                this.getChannels();
            })
        }
    }

    enterChannel = (channelID, channelName) => {
        this.setState({ selectedChannelID: channelID, selectedChannelName: channelName, active: true })
        console.log(channelID)
        console.log(this.state.selectedChannelID)
        //setInterval(() => {
            axios.get('/api/messages/' + channelID).then((response) => {
                console.log('enter channel response')
                console.log(response)
                if (response.data.length === 0) {
                    this.setState({ messages: [{ messageBody: 'This is the beginning of the conversation...' }] })
                    console.log(this.state.messages)
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
                console.log(this.state.messages)
            })
            this.props.setAppState(channelID, channelName)
        //}, 2000)
    }



    setChannelState = (message) => {

        this.state.messages.push(message)
        this.setState({ messages: this.state.messages })
        console.log(this.state.messages)

    }

    deleteChannel = channelID => {
        let remainingChannels = this.state.channels.filter((channel) => {
            return channel._id !== channelID;
        })
        console.log(remainingChannels)
        this.setState({ channels: remainingChannels, messages: [] })
        this.props.setAppState('', '')
        axios.delete('/api/channel/' + channelID)
            .then(function (response) {
                console.log(response)
            })
    }

    render() {

        return (
            <div>

                <div className="sidenav">
                    <h4>add a channel</h4>
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

                    {this.state.channels.length ? <h4 id="existing-channels">existing channels</h4> : ''}

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
                        <Message keyID={message._id} sender={message.sender} text={message.messageBody} />
                    ))}
                </div>
                <div className="footer">
                    <MessageBox
                        userID={this.props.userID}
                        user={this.props.user}
                        selectedChannelID={this.state.selectedChannelID}
                        selectedChannelName={this.state.selectedChannelName}
                        setChannelState={this.setChannelState} />
                </div>
            </div>
        )
    }
}

export default ChannelPage;