//server.js
//import express
const express = require('express');
const app = express();


// for .env we are hidding port number
const dotenv = require('dotenv');
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080  //8080 is default


//path is inbulid module in node, use to give path
const path = require('path');


const morgan = require('morgan');
// log requests
app.use(morgan('tiny'));

// mongodb connection
const connectDB = require('./server/database/connection');
connectDB();


const bodyparser = require("body-parser");
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))


// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))


// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))



// load routers
app.use('/', require('./server/routes/router'))




app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});