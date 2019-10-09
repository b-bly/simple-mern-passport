import React from 'react';
import Message from '../Message/Message'
import ChannelBox from '../ChannelBox/ChannelBox';

function ChannelPage() {
    return (
        <div>
            <div className="w3-sidebar w3-light-grey w3-bar-block">
                <ChannelBox />
            </div>

            <div id="channels-container">

                <div className="w3-container w3-teal">
                    <h1>My Page</h1>
                </div>

                <div className="w3-container">
                    <Message />
                </div>

            </div>
        </div>


    )
}
export default ChannelPage;