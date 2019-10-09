import React from 'react';
import Message from '../Message/Message'
import ChannelBox from '../ChannelBox/ChannelBox';
import MessageBox from '../MessageBox/MessageBox';

function ChannelPage() {
    return (
        <div>
            <div className="w3-sidebar w3-light-grey w3-bar-block sidebar">
                <p>Add channel</p>
                <button className="w3-btn w3-black w3-round">Submit</button>
                <ChannelBox />
            </div>

            <div id="channels-container">

                <div className="w3-container w3-teal">
                    <h1>My Page</h1>
                    
                </div>

                <div className="w3-container messages">
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />
                    <Message />

                    <MessageBox />
                </div>

            </div>
        </div>


    )
}
export default ChannelPage;