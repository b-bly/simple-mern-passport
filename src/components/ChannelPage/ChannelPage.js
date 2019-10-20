import React from 'react';
import Message from '../Message/Message'
import MessageTop from '../Message/MessageTop'
import axios from 'axios'
import MessageBox from '../MessageBox/MessageBox'



class ChannelPage extends React.Component {
    constructor(props) {
        super(props)
        this.channelHandleChange = this.channelHandleChange.bind(this);
        this.addChannel = this.addChannel.bind(this);
    }

    state = {
        inputValue: '',
        channels: [],
        selectedChannelID: '',
        selectedChannelName: '',
        messages: []
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

    addChannel() {
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
            this.setState({ channels: channelsArray, inputValue: '' });
            this.getChannels();
        })
    }

    enterChannel = (channelID, channelName) => {
        this.setState({ selectedChannelID: channelID, selectedChannelName: channelName })
        console.log(channelID)
        console.log(this.state.selectedChannelID)
        axios.get('/api/messages/' + channelID).then((response) => {
            console.log(response.data)
            if (response.data.length === 0) {
                this.setState({ messages: [{ messageBody: 'Looks like there are no messages here yet...' }] })
                console.log(this.state.messages)
            }
            else {
                this.setState({ messages: response.data })
            }
            console.log(this.state.messages)
        })
        this.props.setAppState(channelID, channelName)
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
        this.setState({ channels: remainingChannels })
        axios.delete('/api/channel/' + channelID)
            .then(function (response) {
                console.log(response)
            })
    }

    render() {

        return (
            <div>

                <div className="sidenav">
                    <h4>Add a channel</h4>
                    <div id="add-channel-div">
                        <input className="inp w3-transparent w3-text-white" style={{ padding: 8 }}
                            value={this.state.inputValue}
                            type="text"
                            placeholder="enter channel here"
                            onChange={this.channelHandleChange}>
                        </input>

                        <button
                            className='w3-hover-opacity bttn'
                            onClick={this.addChannel}>+
                        </button>
                    </div>


                    <ul id="sidenav-ul">
                        {this.state.channels.map(channel => (
                            <div className="channel-group">
                                <li onClick={() => this.enterChannel(channel._id, channel.channelName)}
                                    key={channel._id}>{channel.channelName}
                                </li>
                                <button onClick={() => this.deleteChannel(channel._id)} className="channel-delete">x</button>
                            </div>
                        ))}
                    </ul>
                </div>
                <div id="message-output" className="content">
                   {/* <MessageTop /> */}
                   {this.state.messages.map(message => (
                       <Message keyID={message._id} sender={this.props.user} text={message.messageBody} />
                   ))}
               </div>
                <div className="footer">
                    <MessageBox
                        userID={this.props.userID}
                        selectedChannelID={this.state.selectedChannelID}
                        selectedChannelName={this.state.selectedChannelName}
                        setChannelState={this.setChannelState} />
                </div>
            </div>
        )
    }
}
export default ChannelPage;