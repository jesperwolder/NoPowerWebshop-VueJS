const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Fetcher = require('../Modules/Fetcher');
let Orders = require('../Schema/OrderSchema');

const Validator = require('../Modules/Validator.js');

router.get('/', async (req, res) => {
    let body = await Validator.ValidateJwt(req.headers.jwt);
    if(!body) {
        res.status(403).json({
            message: 'Du er ikke autoriseret til denne handling',
            order: null
        });
    }
    
    let orders = Orders.find({ Buyer: { _id: body.user._id, Fullname: body.user.fullName } });
});

module.exports = router;