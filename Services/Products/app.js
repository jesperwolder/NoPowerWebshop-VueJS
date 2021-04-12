const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./modules/mongo.js')

let getAllRouter = require('./Routes/GetAll.js');
let indexRouter = require('./Routes/index.js');
let createRoute = require('./Routes/CreateProduct.js');

let app = express();

app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/', indexRouter);
app.use('/all', getAllRouter);
app.use('/create', createRoute);

app.listen(3001);

module.exports = app;