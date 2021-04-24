const express = require('express');
const axios = require('axios');

const auth = require('../modules/authentication');
const Product = require('../Schema/Product');
require('dotenv').config();

const router = express.Router();

router.post('/:ID', async (req, res) => {
    if(!req.headers.jwt) {
        res.status(403).json({
            message: 'Manglende jwt',
            product: null
        });
        return;
    }

    let options = { headers: { jwt: req.headers.jwt } };
    let err, response = await axios.post('http://' + process.env.AuthService + '/auth', null, options);
    if(err || !response.data.isAdmin) {
        res.status(403).json({
            message: 'Ikke autoriseret',
            product: null
        });
        return;
    }

    let err2, product = await Product.findById(req.params.ID);
    if(err2 || !product) {
        res.status(404).json({
            message: 'product ikke fundet',
            product: null
        });
        return;
    }

    product.Active = !product.Active;
    product.save();

    res.json({
        message: 'success',
        product: product
    });
});

module.exports = router;