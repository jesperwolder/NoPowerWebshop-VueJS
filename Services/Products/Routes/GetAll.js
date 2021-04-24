const express = require('express');
const Product = require('../Schema/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    let err, products = await Product.find({});
    if(err || !products) {
        res.status(404).json({
            message: 'Ingen produkter fundet, prøv igen senere',
            products: null
        });
        return;
    }

    let prods = [];
    products.forEach(prod => {
        if(prod.Active) {
            prods.push(prod);
        }
    });
    

    res.json({
        message: 'success',
        products: prods
    });
});

module.exports = router;