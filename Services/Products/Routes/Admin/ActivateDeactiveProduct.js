const express = require('express');
const axios = require('axios');

const auth = require('../../modules/authentication');
const Product = require('../../Schema/Product');
require('dotenv').config();

const router = express.Router();

router.post('/:ID/:status', async (req, res) => {
    // Checking if the jwt was sent
    if(!req.headers.jwt) {
        res.status(403).json({
            Message: 'Manglende jwt',
            Product: null
        });
        return;
    }

    //checking if the status was sent
    if(!req.params.status) {
        res.status(422).json({
            Message: "manglende status",
            Product: null
        });
        return;
    }

    // Setting options
    let options = { headers: { jwt: req.headers.jwt } };

    // Requesting the auth server for authorization
    let err, response = await axios.post('http://' + process.env.AuthService + '/auth', null, options);

    // Checking for errors or if the user is admin
    if(err || !response.data.isAdmin) {
        res.status(403).json({
            Message: 'Ikke autoriseret',
            Product: null
        });
        return;
    }

    // Finding the product with the given id
    let err2, product = await Product.findById(req.params.ID);
    // checking for errors or if the product was not found
    if(err2 || !product) {
        res.status(404).json({
            Message: 'product ikke fundet',
            Product: null
        });
        return;
    }

    let status = false;
    if(req.params.status == 'true'){
        status = true;
    }

    // Changing the active value and saving the changes
    product.Active = status;
    product.save();

    // Success response
    res.json({
        Message: 'success',
        Product: product
    });
});

module.exports = router;