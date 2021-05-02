const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../../Schema/Product.js')

const validator = require('../../modules/Validator.js');
const auth = require('../../modules/authentication.js');

const router = express.Router();

router.post('/', async (req, res) => {
    // Checking if the jwt was received
    if(!req.headers.jwt) {
        res.status(403).json({
            message: 'unauthorized'
        });
        return;
    }

    // Setting the http options
    let options = { headers: { jwt: req.headers.jwt } };

    // Requesting the user service for authentication
    let err, response = await axios.post(
        'http://' + process.env.AuthService + '/auth', 
        null,
        options
    );

    // Checking for errors or if the user is not admin
    if(err || !response.data.isAdmin) {
        res.status(403).json({
            message: err.response.data.message,
            product: null
        });
        return;
    }

    // Changes to first letter to uppercase and the rest to lowercase
    let newCats = []
    req.body.product.Categories.forEach(Cat => {
        Cat = Cat[0].toUpperCase() + Cat.slice(1).toLowerCase();
        newCats.push(Cat);
    });

    // failed is a value indictating if the validation for TechnicalDetails failed
    let failed = false;
    req.body.product.TechnicalDetails.forEach(detail => {
        // Checking if the 2 keys exists within the detail object
        if(!('header' in detail) || !('items' in detail)) {
            failed = true;
            return;
        }else {
            // checking if the required keys exists within items
            detail.items.forEach(item => {
                if(!('name' in item) || !('value' in item)){
                    failed = true;
                    return;
                }
            });
            if(failed){
                return;
            }
        }
    });

    // returns an error if the validation failed
    if(failed){
        res.status(422).json({
            message: 'Manglende værdier i tekniske detaljer',
            product: null
        });
        return;
    }

    // Creating a product variable in order to save it on the db
    let product = new Product(req.body.product);
    product._id = mongoose.Types.ObjectId();
    product.Creator.createdBy = response.data.user._id;
    product.Creator.creatorEmail = response.data.user.email;
    product.Creator.creatorFullname = response.data.user.fullname;
    product.Categories = newCats;

    // Checking if Technical details was provided or if any value is not provided
    if(product.TechnicalDetails.length == 0 || validator.ObjectHasNoNull(product)) {
        res.status(401).json({
            message: 'Der var ikke nok tekniske detaljer, eller også er alle værdier ikke udfyldt'
        });
        return;
    }

    // saving the new product
    product.save();

    // success response
    res.json({
        message: 'success',
        product: product
    });

});

module.exports = router;