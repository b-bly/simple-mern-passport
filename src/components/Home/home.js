import React from 'react'
import { Link } from "react-router-dom"
function Home(props) {

    if (props.loggedIn) {
       return (
           <div>
               <h1>Go to <Link to="/channels">Channels</Link></h1>
           </div>
       )
    }
    else {
        return (
            <div className="mt-5 ">
                <h3>To get started, <Link to="/login"><span className="w3-border p-2 w3-round w3-hover-border-blue w3-hover-grayscale">log in</span></Link> or <Link to="/signup"><span className="w3-border p-2 w3-round w3-hover-border-blue w3-hover-grayscale">sign up</span></Link></h3>
            </div>
        )
    }

}

export default Home
