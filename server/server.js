const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dbConnection = require('./database') 
const app = express()
const PORT = 8080
//routes
const user = require('./routes/user')

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

//routing
app.use('/user', user)

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
