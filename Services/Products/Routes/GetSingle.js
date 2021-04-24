const express = require('express');
const Product = require('../Schema/Product');

const router = express.Router();

router.get('/:id', async (req, res) => {
    // Finding the product from the given id
    let err, product = await Product.findById(req.params.id);

    //Checking for errors or if no product was found
    if(err || !product) {
        res.status(404).json({
            message: 'Not found',
            product: null
        });
        return;
    }

    // Success response
    res.json({
        message: 'success',
        product: product
    });
});

module.exports = router;