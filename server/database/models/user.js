const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.promise = Promise

// Define userSchema
const userSchema = new Schema({

	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false }

})

const User = mongoose.model('User', userSchema)
module.exports = User