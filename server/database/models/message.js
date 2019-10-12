const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const messageSchema = new Schema({

    ChannelName: String,
    ChannelID: {type: String, required: true},
    Sender: {type: String, required: true},
    MessageText: String

})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message