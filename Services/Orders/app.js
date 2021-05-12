const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./Modules/mongo');

let indexRouter = require('./Routes/index.js');
let createRoute = require('./Routes/Create');
let getUserOrdersRoute = require('./Routes/GetUserOrders');

let app = express();

app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/', indexRouter);
app.use('/create', createRoute);
app.use('/orders', getUserOrdersRoute);

app.listen(3002);

module.exports = app;