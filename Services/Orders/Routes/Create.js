const express = require('express');
const router = express.Router();

const logic = require('../Logic/Create');

router.post('/', async (req, res) => {
    try {
        let Order;
        if(req.headers.jwt) {
            Order = await logic.Execute(
                req.headers.jwt, 
                req.body.Order.Products,
                null,
                null,
                null,
                null
            );
        }else {
            Order = await logic.Execute(
                null,
                req.body.Order.Products,
                req.body.Order.Billing.Fullname,
                req.body.Order.Billing.Email,
                req.body.Order.Billing.Phone,
                req.body.Order.Billing.Address
            );
        }
        
        res.json({
            Message: 'Success',
            Order: Order
        });
    }catch(e) {
        if(e.hasOwnProperty('code')){
            res.status(e.code).json({
                Message: e.msg,
                Order: null
            });
        }else {
            console.log(e);
            res.status(404).json({
                Message: 'Der skete en ukendt fejl, prøv igen senere',
                Order: null
            });
        }
    }
});

module.exports = router;