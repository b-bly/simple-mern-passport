const express = require('express')
const router = express.Router()
const Message = require('../database/models/message')

router.post('/messages/:channelID', (req, res) => {
    console.log('req.body: ')
    console.log(req.body)
    res.json(req.body)
    //Channel.create({"ChannelName": req.body.ChannelName, "Messages": req.body.Messages, "Users": req.body.Users})
})


router.get('/messages/:channelID', (req, res) => {
    console.log('req.body: ')
    console.log(req.body)
    res.json(req.body)
    //Channel.create({"ChannelName": req.body.ChannelName, "Messages": req.body.Messages, "Users": req.body.Users})
})
module.exports = router