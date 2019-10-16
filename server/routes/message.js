const express = require('express')
const router = express.Router()
const Message = require('../database/models/message')
const Channel = require('../database/models/channel')

router.post('/messages/:channelID', (req, res) => {

   return Message.create({
        "channelName": req.body.channelName, 
        "sender": req.body.sender, 
        "channelID": req.body.channelID, 
        "messageBody": req.body.messageBody
    }).then(function(message) {
        console.log('message: ')
        console.log(message)
        res.json(message)
        return Channel.findOneAndUpdate({_id: message.channelID}, {$push: {messages: message._id}}, {new: true})
    })

})


router.get('/messages/:channelID', (req, res) => {
    console.log('req.body: ')
    console.log(req.body)
    res.json(req.body)
    //Channel.create({"ChannelName": req.body.ChannelName, "Messages": req.body.Messages, "Users": req.body.Users})
})
module.exports = router