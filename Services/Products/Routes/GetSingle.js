const express = require('express');
const Product = require('../Schema/Product');

const router = express.Router();

router.get('/:id', async (req, res) => {
    let err, product = await Product.findById(req.params.id);
    if(err || !product) {
        res.status(404).json({
            message: 'Not found',
            product: null
        });
        return;
    }

    res.json({
        message: 'success',
        product: product
    });
});

module.exports = router;