const express = require('express');
const Product = require('../Schema/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    let err, products = await Product.find({});
    if(err || !products) {
        res.status(404).json({
            message: 'Der skete en fejl',
            products: null
        });
        return;
    }

    res.json({
        message: 'success',
        products: products
    });
});

module.exports = router;