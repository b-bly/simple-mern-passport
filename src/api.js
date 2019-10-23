import openSocket from "socket.io-client";
import io from 'socket.io-client';
const socket = io("http://localhost:8080");


function subscribeToChat (cb) {
    socket.on('msg', msg => { //console.log(msg)
        cb(null, msg)
      })
}

export { subscribeToChat }