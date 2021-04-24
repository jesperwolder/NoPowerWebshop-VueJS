const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./modules/mongo.js')

// Setting route variables
let indexRouter = require('./Routes/index.js');
let createRoute = require('./Routes/CreateProduct.js');
let getAllRoute = require('./Routes/GetAll.js');
let getSingle = require('./Routes/GetSingle.js');
let updateRoute = require('./Routes/UpdateProduct');
let changeprodStatusRoute = require('./Routes/ActivateDeactiveProduct');

let app = express();

// Parsing middleware
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Initiating routes
app.use('/', indexRouter);
app.use('/create', createRoute);
app.use('/all', getAllRoute);
app.use('/product/', getSingle);
app.use('/update', updateRoute);
app.use('/productStatus', changeprodStatusRoute);

app.listen(3001);

module.exports = app;