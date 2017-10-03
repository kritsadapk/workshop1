const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const routes = require('./api/routes/timeCheckRoutes')
routes(app)
app.listen(port, function() {
    console.log('App running')
})