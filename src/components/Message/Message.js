import React from 'react'
import avatar from '../../images/Avatar4.png'
import './Message.css'
const messageStyle = {
    borderRadius: '10px',
    padding: '0',
    color: "white",
    backgroundColor: '#00008b',
    marginTop: 10,
    marginBottom: 10
}

const imgSize = {
    width: 50,
    height: 50,
    float: 'left'
}

function Message(props) {
    return (
        <div key={props.keyID} id="message-div" style={messageStyle}>

            <p key={props.keyID}><img key={props.keyID} style={imgSize} src={avatar} alt="avatar" />{`${props.sender}: ${props.text}`}</p>

        </div>

    )
}

export default Message;