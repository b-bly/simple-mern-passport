const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database') 
const app = express()
const PORT = 8080
//route requires
const user = require('./routes/user')

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

//sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
	})
)
app.use( (req, res, next) => {
	console.log('req.session', req.session);
	return next();
  });

// routes
app.use('/user', user)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
