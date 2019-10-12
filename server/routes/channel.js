const express = require('express')
const router = express.Router()
const Channel = require('../database/models/channel')
const User = require('../database/models/user')

router.post('/channel', (req, res) => {
    console.log('req.body: ')
    console.log(req.body)
    return Channel.create({"channelName": req.body.channelName, "messages": req.body.messages})
    .then((createdChannel) => {
        console.log('createdChannel')
        console.log(createdChannel)
        return Channel.findOneAndUpdate({_id: createdChannel._id}, {$push: {users: req.body.userID}}, {new: true})
    }).then(updatedChannel => {
        console.log('updatedChannel')
        console.log(updatedChannel)
        return User.findOneAndUpdate({_id: req.body.userID}, {$push: {channels: updatedChannel._id}}, {new: true})
    }).then((updatedUser) => {
        console.log("updatedUser")
        console.log(updatedUser)
        res.send("success")
    })
    
})

router.get('/channel', (req, res) => {
    
    console.log('req.body: ')
    console.log(req.body)
    res.send(req.body)
})

module.exports = router