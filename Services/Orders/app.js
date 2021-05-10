const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./modules/mongo.js')

// Setting route variables
let indexRouter = require('./Routes/index.js');

let app = express();

// Parsing middleware
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Initiating routes
app.use('/', indexRouter);

app.listen(3003);

module.exports = app;