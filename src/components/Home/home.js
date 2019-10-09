import React, { Component } from 'react'
import Navbar from '../Navbar/navbar'
function Home(props) {

    if (props.loggedIn) {
       return (
           <div>
               <h1>Go to <a href="/channels">Channels</a></h1>
           </div>
       )
    }
    else {
        return (
            <div>
                <h1>To get started, <a href="/login">log in</a> or <a href="/signup">sign up</a></h1>
            </div>
        )
    }


}

export default Home
