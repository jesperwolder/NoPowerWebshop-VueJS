const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Fetcher = require('../../modules/Fetcher');
let Orders = require('../../Schema/OrderSchema');

router.get('/', async (req, res) => {
    let body = await Fetcher.ValidateJwt(req.headers.jwt);
    if(!body || !body.isAdmin) {
        res.status(403).json({
            Message: 'Du er ikke autoriseret til denne handling',
            Orders: null
        });
        return;
    }
    
    let err, orders = await Orders.find({});
    if(err) {
        res.status(404).json({
            Message: 'Der skete en fejl prøv igen senere',
            Orders: null
        });
        return;
    }

    res.json({
        Message: 'Success',
        Orders: orders
    });
});

module.exports = router;