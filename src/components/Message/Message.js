import React from 'react'
import avatar from '../../images/Avatar4.png'
import './Message.css'
const messageStyle = {
    borderRadius: '10px',
    padding: '0',
    backgroundColor:'#3498DB',
    color: "white",
}

const imgSize = {
    width: 50,
    height: 50,
    float: 'left'
}

function Message() {
return (
<div id="message-div" style={messageStyle}>
​
<img style={imgSize} src={avatar} alt="avatar" />
<p>Sample Text Messages Goes Here.</p>
​
</div>
        
    )
}

export default Message;