const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../Schema/Product.js')

const validator = require('../modules/Validator.js');
const auth = require('../modules/authentication.js');

const router = express.Router();

router.post('/', async (req, res) => {
    if(!req.headers.jwt) {
        res.status(403).json({
            message: 'unauthorized'
        });
        return;
    }

    let options = { headers: { jwt: req.headers.jwt } };
    let err, response = await axios.post(
        'http://' + process.env.AuthService + '/auth', 
        null,
        options
    );

    if(err || !response.data.isAdmin) {
        res.status(403).json({
            message: err.response.data.message
        });
        return;
    }

    let product = new Product(req.body.product);
    product._id = mongoose.Types.ObjectId();
    product.Creator.createdBy = response.data.user._id;
    product.Creator.creatorEmail = response.data.user.email;
    product.Creator.creatorFullname = response.data.user.fullname;

    if(product.TechnicalDetails.length == 0 || validator.ObjectHasNoNull(product)) {
        res.status(401).json({
            message: 'Der var ikke nok tekniske detaljer, eller også er alle værdier ikke udfyldt'
        });
        return;
    }

    product.save();

    res.json({
        message: 'success',
        product: product
    });

});

module.exports = router;