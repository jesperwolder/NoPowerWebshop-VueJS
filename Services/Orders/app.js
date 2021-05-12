const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./Modules/mongo');

let indexRouter = require('./Routes/index.js');
let createRoute = require('./Routes/Create');
let getUserOrdersRoute = require('./Routes/GetUserOrders');
let getSingleOrder = require('./Routes/GetSingleOrder');

// Admin routes
let getAllOrders = require('./Routes/Admin/GetAllOrders');
let statusRoute = require('./Routes/Admin/Statuses');
let updateStatusRoute = require('./Routes/Admin/UpdateStatus');
let getAnyOrderRoute = require('./Routes/Admin/GetAnyOrder');

let app = express();

app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/', indexRouter); //get
app.use('/create', createRoute); //post kræver jwt body: { ProductIDs [ "ID in string" ]  }
app.use('/orders', getUserOrdersRoute); // get kræver jwt
app.use('/order', getSingleOrder); // get /:OrderID kræver jwt

//Admin Routes
app.use('/admin/all', getAllOrders); //get Kræver jwt
app.use('/admin/statuses', statusRoute); //get Kræver jwt
app.use('/admin/updateStatus', updateStatusRoute); //post kræver jwt, body: { Order: { _id: OrderID, Status: string } }
app.use('/admin/order', getAnyOrderRoute); //get /:OrderID kræver jwt

app.listen(3002);

module.exports = app;