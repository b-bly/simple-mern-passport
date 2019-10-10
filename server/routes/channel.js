const express = require('express')
const router = express.Router()
const Channel = require('../database/models/channel')

router.post('/channel', (req, res) => {
    console.log('req.body: ')
    console.log(req.body)
    Channel.create({"ChannelName": req.body.ChannelName, "Messages": req.body.Messages, "Users": req.body.Users})
})

module.exports = router