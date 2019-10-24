const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const app = express();
const PORT = process.env.PORT || 8080;
const socket = require('socket.io')
// Route requires
const user = require('./routes/user')
const UserModel = require('./database/models/user')
const ChannelModel = require('./database/models/channel')
const MessageModel = require('./database/models/message')
const channel = require('./routes/channel')
const message = require('./routes/message')

// Starting Server 
const server = app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})

//Socket.io
// const server = require("http").Server(app);
const io = socket(server);
// const handlers = require('./handlers.js')(app, server, io);

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

//Socket Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Socket Connection
io.on('connection', (socket) => {
	socket.removeAllListeners();
	console.log('made socket connection', socket.id);
	// Handle chat event
	socket.on('msg', function(data){
		console.log("socket data")
		console.log(data);
		io.emit('msg', data);
		return MessageModel.create({
			"channelName": data.channelName,
			"sender": data.sender,
			"channelID": data.channelID,
			"messageBody": data.messageBody
		}).then(function (message) {
			// console.log('message: ')
			// console.log(message)
			
			return ChannelModel.findOneAndUpdate({ _id: message.channelID }, { $push: { messages: message._id } }, { new: true })
		})
	});
	// Handle typing event
	socket.on('typing', function(data){
		console.log('user is typing')
		socket.broadcast.emit('typing', data);
	});
 });

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


// Routes
app.use('/user', user)
app.use('/api', channel)
app.use('/api', message)

