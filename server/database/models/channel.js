const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define userSchema
const channelSchema = new Schema({

    channelName: String,
    users: [
        {
			type: Schema.Types.ObjectId,
      ref: "user",
      unique: false
		}
    ],
    messages: [
        {
			type: Schema.Types.ObjectId,
			ref: "Message"
		}
    ]
    
})

const Channel = mongoose.model('Channel', channelSchema)
module.exports = Channel