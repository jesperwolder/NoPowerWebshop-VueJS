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
            Message: 'Du er ikke autoriseret til denne handling',
            Order: null
        });
    }
    if(!req.body.ProductIDs || req.body.ProductIDs.length == 0) {
        res.status(420).json({
            Message: "ingen produkter givet",
            Order: null
        });
        return;
    }
    
    let Order = new Orders();
    Order.TotalPrice = 0;

    let failed = false;

    for (ID of req.body.ProductIDs) {
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
            Message: "Et af produkterne eksistere ikke eller er ikke salgbar længere",
            Order: null
        });
        return;
    }

    Order._id = mongoose.Types.ObjectId();

    Order.Buyer._id = body.User._id;
    Order.Buyer.Fullname = body.User.Fullname;
    Order.Buyer.Email = body.User.Email;

    let today = new Date();
    Order.DateOfDelivery = today.setDate(today.getDate() + 3);
    Order.Status = "Under håndtering";

    Order.save(err => {
        console.log(err);
    });

    res.json({
        Message: 'success',
        Order: Order
    });
});

module.exports = router;