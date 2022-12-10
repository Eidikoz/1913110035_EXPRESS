var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const companiesRouter = require("./routes/company");

var app = express();

mongoose.connect('mongodb+srv://pongpanot:1234@1913110035-pongpanot.aviecob.mongodb.net/?retryWrites=true&w=majority')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/company", companiesRouter);

module.exports = app;
