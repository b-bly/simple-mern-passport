const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const PORT = 8080

// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())

//routing
app.post('/', (req, res, next)=> {
	console.log('server post username: ');
	console.log(req.body.username)
})

// Starting Server 
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
