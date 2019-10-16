import React from 'react';
import Message from '../Message/Message'
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
        user: this.props.user,
        channels: [],
        selectedChannelID: '',
        selectedChannelName: ''
    };

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
                this.setState({channels: channelsArray});
                console.log(this.state.channels)
            }
        })
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.getChannels()
        }
    }

    channelHandleChange(event) {
        this.setState({ inputValue: event.target.value })
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
        this.setState({selectedChannelID: channelID, selectedChannelName: channelName})
        console.log(channelID)
        console.log(this.state.selectedChannelID)
        axios.get('/api/messages/' + channelID).then(function(response) {
            console.log(response)
        })
    }

    getMessages = message => {

        

    }

    render() {
        {
            return (
                <div>

                    <div className="sidenav">
                        <h4>Add a channel</h4>

                        <input
                            value={this.state.inputValue}
                            type="text"
                            placeholder="enter channel here"
                            onChange={this.channelHandleChange}>
                        </input>

                        <button
                            className='btn btn-secondary'
                            onClick={this.addChannel}>+
                            </button>

                        <ul id="sidenav-ul">
                            {this.state.channels.map(channel => (
                                <li 
                                onClick={() => this.enterChannel(channel._id, channel.channelName)}
                                key={channel._id}>{channel.channelName}</li>
                            ))}
                        </ul>

                    </div>
                    <div className="content">
                        <Message />

                    </div>
                    <div className="footer">
                        <MessageBox 
                        userID={this.props.userID} 
                        selectedChannelID={this.state.selectedChannelID}
                        selectedChannelName={this.state.selectedChannelName} />
                    </div>
                </div>
            )
        }

    }
}
export default ChannelPage;