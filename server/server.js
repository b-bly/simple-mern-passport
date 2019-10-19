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
	console.log('made socket connection', socket.id);
	// Handle chat event
	socket.on('chat', function(data){
		console.log(data);
		io.sockets.emit('chat', data);
	});
	// Handle typing event
	socket.on('typing', function(data){
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

