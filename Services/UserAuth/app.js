const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./modules/mongo.js');

let indexRouter = require('./Routes/index.js');
let registerRouter = require('./Routes/Register.js');
let loginRoute = require('./Routes/Login.js');
let authRoute = require('./Routes/Auth.js');
let UpdateProfileRoute = require('./Routes/UpdateProfile.js');
let GetAllUserRoute = require('./Routes/GetAllUsers');
let promoteadminRoute = require('./Routes/PromoteToAdmin');

let app = express();

app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use('/', indexRouter);
app.use('/register/', registerRouter);
app.use('/login/', loginRoute);
app.use('/auth/', authRoute);
app.use('/update', UpdateProfileRoute);
app.use('/all', GetAllUserRoute);
app.use('/changeprivilege', promoteadminRoute);

app.listen(3000);

module.exports = app;