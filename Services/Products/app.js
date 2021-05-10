const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./modules/mongo.js')

// Setting route variables
let indexRouter = require('./Routes/index.js');
let createRoute = require('./Routes/Admin/CreateProduct.js');
let getAllRoute = require('./Routes/GetAll.js');
let getSingleRoute = require('./Routes/GetSingle.js');
let updateRoute = require('./Routes/Admin/UpdateProduct');
let changeprodStatusRoute = require('./Routes/Admin/ActivateDeactiveProduct');

let app = express();

// Parsing middleware
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// Initiating routes
app.use('/', indexRouter);
app.use('/admin/create', createRoute);
app.use('/all', getAllRoute);
app.use('/product/', getSingleRoute);
app.use('/admin/update', updateRoute);
app.use('/admin/changeProductStatus', changeprodStatusRoute);

app.listen(3001);

module.exports = app;