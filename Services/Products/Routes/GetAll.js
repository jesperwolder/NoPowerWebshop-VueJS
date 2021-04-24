const express = require('express');
const Product = require('../Schema/Product');

const router = express.Router();

router.get('/', async (req, res) => {
    // Gathering all products from the database
    let err, products = await Product.find({});
    
    // Checking if an error was encountered or if no products was found
    if(err || !products) {
        res.status(404).json({
            message: 'Ingen produkter fundet, prøv igen senere',
            products: null
        });
        return;
    }

    // Removing all inactive products
    let prods = [];
    products.forEach(prod => {
        if(prod.Active) {
            prods.push(prod);
        }
    });

    // Success response
    res.json({
        message: 'success',
        products: prods
    });
});

module.exports = router;