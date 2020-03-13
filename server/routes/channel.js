const express = require('express')
const router = express.Router()
const Channel = require('../database/models/channel')
const User = require('../database/models/user')
const Message = require('../database/models/message')

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
        console.log("updatedUser channels:")
        console.log(updatedUser.channels)
        res.send("success")
        //res.json(updatedUser)
    })
    
})

router.get('/channel', (req, res) => {
    console.log('req.body: ')
    console.log(req.body)
    res.send(req.body)
})

router.get('/channel/:id', (req, res) => {
    console.log(req.body)
    res.send(req.body)
})

router.delete('/channel/:id', (req, res) => {
    console.log(req.params.id)
    return Channel.findById(req.params.id)
    .then(function(response) {
        console.log('delete response: ')
        console.log(response)
        return User.updateMany({_id: { $in: response.users }}, {$pull: {channels: req.params.id}}).then(function(res) {
            console.log('user response')
            console.log(res)
        }).then(function(message) {
            return Message.deleteMany({_id: { $in: response.messages}})
        }).then(function(channel) {
            return Channel.findByIdAndDelete({_id: req.params.id})
        })
        
    })
})
module.exports = router