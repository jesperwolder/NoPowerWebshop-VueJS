const express = require('express');
const axios = require('axios');
require('dotenv').config();
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

    if(req.headers.jwt){
        let error, response = await axios.post('http://' + process.env.AuthService + '/auth', null, { headers: { jwt: req.headers.jwt } });
        if(error || !response.data.isAdmin) {
            product.Creator = null;
        }
    }else {
        product.Creator = null;
    }
    

    // Success response
    res.json({
        message: 'success',
        product: product
    });
});

module.exports = router;