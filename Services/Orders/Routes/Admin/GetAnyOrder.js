const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Fetcher = require('../../modules/Fetcher');
let Orders = require('../../Schema/OrderSchema');

const Validator = require('../../modules/validator');

router.get('/:ID', async (req, res) => {
    let body = await Validator.ValidateJwt(req.headers.jwt);
    if(!body || !body.isAdmin) {
        res.status(403).json({
            Message: 'Du er ikke autoriseret til denne handling',
            Order: null
        });
        return;
    }
    
    let err, order = await Orders.find({ _id: req.params.ID });
    if(err) {
        res.status(504).json({
            Message: 'Der skete en fejl prøv igen senere',
            Order: null
        });
        return;
    }

    if(!order) {
        res.status(404).json({
            Message: 'Det blev ikke fundet nogen ordre',
            Order: null
        });
    }

    res.json({
        Message: 'Success',
        Order: order
    });
});

module.exports = router;