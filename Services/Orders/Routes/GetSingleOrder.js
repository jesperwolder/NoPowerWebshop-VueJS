const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Fetcher = require('../Modules/Fetcher');
let Orders = require('../Schema/OrderSchema');


router.get('/:ID', async (req, res) => {
    let body = await Fetcher.ValidateJwt(req.headers.jwt);
    if(!body) {
        res.status(403).json({
            Message: 'Du er ikke autoriseret til denne handling',
            Order: null
        });
        return;
    }
    
    let err, order = await Orders.findById(req.params.ID);
    if(err) {
        res.status(504).json({
            Message: "Der skete en fejl",
            Order: null
        });
        return;
    }

    if(!order || order.Buyer._id != body.User._id) {
        res.status(404).json({
            Message: 'Der blev ikke fundet nogen ordre',
            Order: null
        });
        return;
    }

    res.json({
        Message: 'Success',
        Order: order
    });
});

module.exports = router;