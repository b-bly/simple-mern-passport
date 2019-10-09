const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const channelSchema = new Schema({

    users: [],
    messages: []
    
})

const Channel = mongoose.model('Channel', channelSchema)
module.exports = Channel