const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../Schema/Product.js')

const auth = require('../modules/authentication.js');

const router = express.Router();

router.post('/', (req, res) => {
    if(!req.headers.jwt) {
        res.status(403).json({
            message: 'unauthorized'
        });
        return;
    }

    let options = { headers: { jwt: req.headers.jwt } }
    let response;
    axios.post(
        'http://' + process.env.AuthService + '/auth', 
        null,
        options
    ).then(response => {
        if(!response.data.isAdmin){
            res.status(403).json({
                message: 'unauthorized'
            });
            return;
        }
    
        var product = new Product();
        product._id = mongoose.Types.ObjectId(req.body.product);
        product.Creator.createdBy = response.data.user._id;
        product.Creator.creatorEmail = response.data.user.email;
        product.Creator.creatorFullname = response.data.user.fullname;
    
        product.save();
    
        res.status(200).json({
            message: 'success'
        });
        return;
    })
    .catch(err => {
        console.log(err);
        res.status(503).json({
            message: 'an unknown error has occured'
        });
        return;
    });

});

module.exports = router;