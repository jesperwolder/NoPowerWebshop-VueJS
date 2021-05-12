const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Fetcher = require('../../modules/Fetcher');
let Orders = require('../../Schema/OrderSchema');

const Validator = require('../../modules/validator');

router.post('/', async (req, res) => {
    let body = await Validator.ValidateJwt(req.headers.jwt);
    if(!body || !body.isAdmin) {
        res.status(403).json({
            Message: 'Du er ikke autoriseret til denne handling',
            Order: null
        });
        return;
    }

    if(!req.body.Order || !req.body.Order._id || !req.body.Order.Status) {
        res.status(503).json({
            Message: "Manglende værdier",
            Order: null
        });
    }
    
    let err, order = await Orders.findById(req.body.Order._id);
    if(err || !order) {
        res.status(404).json({
            Message: "Ingen ordre blev fundet, ellers skete der en teknisk fejl",
            Order: null
        });
        return;
    }

    order.Status = req.body.Order.Status;
    order.save();

    res.json({
        Message: 'Success',
        Order: order
    });
});

module.exports = router;