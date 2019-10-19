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
    }).then(function (message) {
        // console.log('message: ')
        // console.log(message)
        res.json(message)
        return Channel.findOneAndUpdate({ _id: message.channelID }, { $push: { messages: message._id } }, { new: true })
    })

})


router.get('/messages/:channelID', (req, res) => {

    return Channel.findById(req.params.channelID).then(function (response) {
        // console.log('response')
        // console.log(response)
        //res.json(response)
        return Message.find({ _id: { $in: response.messages } })
            .then(function (messagesResponse) {
                // console.log('messages response: ')
                // console.log(messagesResponse)
                res.json(messagesResponse)
            })
    })

})
module.exports = router