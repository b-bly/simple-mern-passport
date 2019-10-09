import React from 'react'
import './MessageBox.css'

function MessageBox() {
return (

<div id="message-box" className="navbar fixed-bottom">
​
<form className="w3-card-4 w3-round form">
  <p><textarea className="w3-input" placeholder="Enter Message Here"></textarea></p>
  <p><button className="w3-btn w3-blue w3-round">Submit</button></p>
</form>
​
</div>
        
    )
}

export default MessageBox