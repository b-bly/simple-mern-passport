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
            <div>
                <h1>To get started, <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link></h1>
            </div>
        )
    }

}

export default Home
