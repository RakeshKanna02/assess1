const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')//logger for record keeping og all the methods calling
const bodyParser= require('body-parser')
const cors = require('cors') //for network authentication of ports

app.set('port',(process.env.PORT || 8081))//setting the port
app.use(bodyParser.json());//to work with json we have to use this line
app.use(bodyParser.urlencoded({extended:false}))//for url protection

app.use(cors())
app.use('/api',api)
app.use(express.static('static'))//folder to make public
app.use(morgan('dev'))//the module for keeping records of every login and working
app.use(function(req,res){
    const err = new Error('Not Found')
    err.status=404
    res.json(err)
})
//Mongo db connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/virtualstandups',{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',console.error.bind(console,'connection error:'))//on is the event which shows errorwhen fails
//bind is to get the exact 
db.once('open',function(){
    console.log('Connected to MongoDB')
    app.listen(app.get('port'),function(){
        console.log('API Server Listening on port'+app.get('port')+'!')
    })
}) //http:localhost:8081/api/standup
