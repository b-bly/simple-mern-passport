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

                <div>
                    <img src="https://media.giphy.com/media/3o6fJ66RKYXJbkQ1RC/giphy.gif" style={{ marginTop: 50, marginBottom: 200 }} alt="Sign" width="300" height="225"></img>
                </div>
            </div>


        )
    }



}

export default Home
