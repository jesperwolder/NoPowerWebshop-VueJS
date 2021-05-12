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
            Message: 'unauthorized',
            Product: null
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
            Message: err.response.data.Message,
            Product: null
        });
        return;
    }

    // Changes to first letter to uppercase and the rest to lowercase
    let newCats = []
    req.body.Product.Categories.forEach(Cat => {
        Cat = Cat[0].toUpperCase() + Cat.slice(1).toLowerCase();
        newCats.push(Cat);
    });

    // failed is a value indictating if the validation for TechnicalDetails failed
    let failed = false;
    req.body.Product.TechnicalDetails.forEach(detail => {
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
            Message: 'Manglende værdier i tekniske detaljer',
            Product: null
        });
        return;
    }

    // Creating a product variable in order to save it on the db
    let product = new Product(req.body.Product);
    product._id = mongoose.Types.ObjectId();
    product.Creator._id = response.data.User._id;
    product.Creator.Email = response.data.User.Email;
    product.Creator.Fullname = response.data.User.Fullname;
    product.Categories = newCats;

    // Checking if Technical details was provided or if any value is not provided
    if(product.TechnicalDetails.length == 0 || validator.ObjectHasNoNull(product)) {
        res.status(401).json({
            Message: 'Der var ikke nok tekniske detaljer, eller også er alle værdier ikke udfyldt'
        });
        return;
    }

    // saving the new product
    product.save();

    // success response
    res.json({
        Message: 'success',
        Product: product
    });

});

module.exports = router;