import React from 'react'
import avatar from '../../images/Avatar4.png'
import './Message.css'
const messageStyle = {
    borderRadius: '10px',
    padding: '0',
    color: "black",
    //backgroundColor: '#00008b',
    marginTop: 10,
    marginBottom: 10
}



const imgSize = {
    width: 50,
    height: 50,
    float: 'left'
}


function Message(props) {
    if (props.text !== 'This is the beginning of the conversation...') {
        return (
            <div id="message-div" style={messageStyle}>
                <img key={props.keyID} style={imgSize} src={avatar} alt="avatar" />

                <div id="sender-and-body">
                    <p id="sender" key={props.text}>
                        {`${props.sender}`}
                    </p>
                    <p id="message-body">{`${props.text}`}</p>
                </div>


            </div>
        )
    }
    else {
        return (
            <div key={props.keyID} id="no-message-div" style={messageStyle}>

                <p key={props.keyID}>{`${props.text}`}</p>

            </div>
        )
    }
}

export default Message;