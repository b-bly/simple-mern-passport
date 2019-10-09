import React from 'react';
import Message from '../Message/Message'
import axios from 'axios'
import ChannelBox from '../ChannelBox/ChannelBox';
import MessageBox from '../MessageBox/MessageBox';

class ChannelPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {inputValue: ''};

        this.handleChange = this.handleChange.bind(this);
        this.addChannel = this.addChannel.bind(this);

    }
    handleChange (event) {
        this.setState({inputValue: event.target.value})
        console.log(this.state.inputValue)
    }
    addChannel () {
        let channel = {
            "ChannelName": this.state.inputValue,
            "Messages": [],
            "Users": []
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
                </div>
                <div className="footer">
                    <MessageBox />
                </div>
            </div>
        )
    }
}
export default ChannelPage;