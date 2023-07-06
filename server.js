const express = require("express");
require("dotenv").config()
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const mainRouter = require('./routes/router')
const methodOverride = require('method-override')
const app = express();



const connectionString = process.env.MONGODBURL
mongoose.connect(connectionString, {
    useNewUrlParser: true, useUnifiedTopology: true
})
    
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))


app.use('/articles', mainRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT);