import React from 'react';
import Message from '../Message/Message'
import axios from 'axios'
import ChannelBox from '../ChannelBox/ChannelBox';
import MessageBox from '../MessageBox/MessageBox';
import ChannelsNav from '../ChannelsNav/ChannelsNav'

class ChannelPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {inputValue: ''};
        this.handleChange = this.handleChange.bind(this);
        this.addChannel = this.addChannel.bind(this);

    }
    handleChange (event) {
        this.setState({inputValue: event.target.value})
    }
    addChannel () {
        let channel = {
            "ChannelName": this.state.inputValue,
            "Messages": [],
            "Users": [this.props.user]
        }
        axios({
            method: 'post',
            url: '/api/channel',
            data: channel
        }).then(function(response) {
            console.log(response)
        })
    }
    
    render () {
        {
            if(this.props.loggedIn) {
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
    
                        <p>Channel One</p>
                        <p>Channel Two</p>
                        <p>Channel Three</p>
                        <p>Channel Four</p>
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