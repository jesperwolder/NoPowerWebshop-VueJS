const express = require('express');
const axios = require('axios');
const Product = require('../Schema/Product');

const router = express.Router();

router.get('/:limit/:page', async (req, res) => {
    
    let isAdmin = false; 
    if(req.headers.jwt){
        let error, response = await axios.post('http://' + process.env.AuthService + '/auth', null, { headers: { jwt: req.headers.jwt } });
        if(!error) {
            isAdmin = response.data.isAdmin;
        }
    }

    //Setting limit on products
    let limit = 100;
    if(req.params.limit > 0) limit = req.params.limit;

    // Setting the offset based on page number and the limit
    let offset = 0;
    if(req.params.page > 0) offset = limit * req.params.page;

    // Gathering all products from the database
    let err, products;

    if(!isAdmin) {
        err, products = await Product.find({ isActive: true }).skip(offset).limit(parseInt(limit));
    }else {
        err, products = await Product.find({}).skip(offset).limit(parseInt(limit));
    }

    console.log(products.length);
    // Checking if an error was encountered or if no products was found
    if(err || !products) {
        res.status(404).json({
            Message: 'Ingen produkter fundet, prøv igen senere',
            Products: null
        });
        return;
    }

    // Success response
    res.json({
        Message: 'success',
        Products: products
    });
});

module.exports = router;