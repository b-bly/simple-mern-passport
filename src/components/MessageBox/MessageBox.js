import React from 'react'
import './MessageBox.css'

function MessageBox() {
return (

<div id="message-box" className="fixed-bottom">
​
<div id="input-and-button" className="input-group mb-3 mx-auto">
  <input id="message-input" type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
  <div id="send-div" className="input-group-append">
    <button id="send" className="btn btn-outline-secondary" type="button">Send</button>
  </div>
</div>

</div>
        
    )
}

export default MessageBox