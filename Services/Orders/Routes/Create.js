const express = require('express');
const router = express.Router();
let mongoose = require('mongoose');
let Fetcher = require('../Modules/Fetcher');
let Orders = require('../Schema/OrderSchema');

const Validator = require('../Modules/Validator.js');

router.post('/', async (req, res) => {
    let body = await Validator.ValidateJwt(req.headers.jwt);
    if(!body) {
        res.status(403).json({
            message: 'Du er ikke autoriseret til denne handling',
            order: null
        });
    }
    if(!req.body.productIDs || req.body.productIDs.length == 0) {
        res.status(420).json({
            message: "ingen produkter givet",
            order: null
        });
        return;
    }
    
    let Order = new Orders();
    Order.TotalPrice = 0;

    let failed = false;

    for (ID of req.body.productIDs) {
        let product = await Fetcher.GetProductByID(ID);
        if(!product || !product.isActive) failed = true;
        else {
            let prod = {
                _id: product._id,
                Name: product.Name,
                Image: product.Image,
                Price: product.Price
            }

            Order.Products.push(prod);
            Order.TotalPrice = Order.TotalPrice + product.Price;
        }
    }

    if(failed) {
        res.status(404).json({
            message: "Et af produkterne eksistere ikke eller er ikke salgbar længere"
        });
        return;
    }

    Order._id = mongoose.Types.ObjectId();

    Order.Buyer._id = body.user._id;
    Order.Buyer.Fullname = body.user.fullname;
    Order.Buyer.Email = body.user.email;

    let today = new Date();
    Order.DateOfDelivery = today.setDate(today.getDate() + 3);
    Order.Status = "Under håndtering";

    Order.save(err => {
        console.log(err);
    });

    res.json({
        message: 'success',
        order: Order
    });
});

module.exports = router;