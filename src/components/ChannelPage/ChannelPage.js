import React from 'react';
import Message from '../Message/Message'
import axios from 'axios'
import MessageBox from '../MessageBox/MessageBox'

class ChannelPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.addChannel = this.addChannel.bind(this);
    }

    state = { 
        inputValue: '' , 
        user: this.props.user, 
        channels: []
    };


    componentDidMount() {
        axios({
            method: 'get',
            url: '/user/',
        }).then((data) => {
            console.log(data)
            let channelsArray = [];
            //console.log(data.data[0]);
            data.data.response[0].channels.map((channel) => {
                channelsArray.push(channel)
                this.setState({channels: channelsArray})
            });
            console.log(this.state.channels)
            // this.setState({channels: channelsArray});
            // console.log(this.state.channels)
        })
    }

    handleChange(event) {
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
        // axios({
        //     method: 'post',
        //     url: '/api/channel',
        //     data: channel
        // }).then((data) => {
        //     let channelsArray = this.state.channels;
        //     channelsArray.push(data)
        //     // console.log(data)
        //     this.setState({channels: channelsArray})
        // })
    }

    render() {
        {
            if (this.props.loggedIn) {
                return (
                    <div>

                        <div className="sidenav">
                            <h4>Add a channel</h4>

                            <input
                                value={this.state.inputValue}
                                type="text"
                                placeholder="enter channel here"
                                onChange={this.handleChange}>
                            </input>

                            <button
                                className='btn btn-secondary'
                                onClick={this.addChannel}>+
                        </button>

                            {this.state.channels.map(channel => (
                                
                                <p key={channel._id}>{channel.channelName}</p>
                            ))}
                        </div>
                        <div className="content">
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />

                        </div>
                        <div className="footer">
                            <MessageBox />
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <h1>Please <a href="/login">log in</a> in or <a href="/signup">sign up</a> first</h1>
                )
            }
        }

    }
}
export default ChannelPage;