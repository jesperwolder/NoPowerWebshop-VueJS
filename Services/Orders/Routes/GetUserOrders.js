const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Fetcher = require('../Modules/Fetcher');
let Orders = require('../Schema/OrderSchema');


router.get('/', async (req, res) => {
    //let body = await Validator.ValidateJwt(req.headers.jwt);
    if(!body) {
        res.status(403).json({
            Message: 'Du er ikke autoriseret til denne handling',
            Orders: null
        });
        return;
    }
    
    let err, orders = await Orders.find({ "Buyer._id": body.User._id});
    console.log(orders);
    if(err) {
        res.status(404).json({
            Message: 'Der skete en fejl prøv igen senere',
            Orders: null
        });
        return;
    }
    
    res.json({
        Message: 'Success',
        Orders: userOrders
    });
});

module.exports = router;