const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const messageSchema = new Schema({

    channelName: String,
    sender: { type: String, ref: "user" },
    channelID: { type: Schema.Types.ObjectId, ref: "channel" },
    messageBody: String

})

const Message = mongoose.model('Message', messageSchema)
module.exports = Message