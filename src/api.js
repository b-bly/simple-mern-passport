import openSocket from "socket.io-client";
import io from 'socket.io-client';
const socket = io();


function subscribeToChat (cb) {
    socket.on('msg', msg => {
        cb(null, msg)
      })
}

function listenForTyping (cb) {
  socket.on('typing', data => {
    cb(null, data)
  })
}
export { subscribeToChat, listenForTyping }