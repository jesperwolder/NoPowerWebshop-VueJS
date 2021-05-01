const express = require('express');
const axios = require('axios');
require('dotenv').config();
const Product = require('../../Schema/Product');

const router = express.Router();

router.post('/', async (req, res) => {
    // setting the http options
    let options = { headers: { jwt: req.headers.jwt } };

    // Requesting the user service for authentication
    let err, response = await axios.post(
        'http://' + process.env.AuthService + '/auth',
        null,
        options
    );

    // checking for any errors and if the user is not admin
    if(err || !response.data.isAdmin) {
        res.status(403).json({
            message: "unauthorized",
            product: null
        });
        return;
    }

    // checkign if the product id was given
    if(!req.body.product._id) {
        res.status(503).json({
            message: "Intet produkt id var givet",
            product: null
        });
        return;
    }

    // finding the product with the given id
    let err2, product = await Product.findById(req.body.product._id);

    // checking for errors or if the product was not found
    if(err2 || !product) {
        res.status(404).json({
            message: "Produktet blev ikke fundet",
            product: null
        });
        return;
    }

    let newCats = [];
    req.body.product.Categories.forEach(Cat => {
        Cat = Cat[0].toUpperCase() + Cat.slice(1).toLowerCase();
        newCats.push(Cat);
    });

    // changing the values in try statement in order to catch null errors
    try {
        // updating the values if the given new value is not null
        product.Name = (req.body.product.name ? req.body.product.name : product.Name);
        product.Description = (req.body.product.description ? req.body.product.description : product.Description);
        product.Price = (req.body.product.price ? req.body.product.price : product.Price);
        product.Image = (req.body.product.image ? req.body.product.image : product.Image);
        product.SalePercentage = (req.body.product.SalePercentage ? req.body.product.SalePercentage : product.SalePercentage);
        product.TechnicalDetails = (req.body.product.TechnicalDetails ? req.body.product.TechnicalDetails : product.TechnicalDetails);
        product.Categories = (newCats ? newCats : product.Categories);

        // Saving the changes
        product.save();
    }catch {
        // error response if an value was not received
        res.status(503).json({
            message: 'Manglende værdier',
            product: null
        });
        return;
    }

    // Success response
    res.json({
        message: "success",
        product: product
    });
});

module.exports = router;