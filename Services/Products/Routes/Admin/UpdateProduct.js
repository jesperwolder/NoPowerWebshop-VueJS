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
            Message: "unauthorized",
            Product: null
        });
        return;
    }

    // checkign if the product id was given
    if(!req.body.Product._id) {
        res.status(503).json({
            Message: "Intet produkt id var givet",
            Product: null
        });
        return;
    }

    // finding the product with the given id
    let err2, product = await Product.findById(req.body.Product._id);

    // checking for errors or if the product was not found
    if(err2 || !product) {
        res.status(404).json({
            message: "Produktet blev ikke fundet",
            product: null
        });
        return;
    }

    let newCats = [];
    req.body.Product.Categories.forEach(Cat => {
        Cat = Cat[0].toUpperCase() + Cat.slice(1).toLowerCase();
        newCats.push(Cat);
    });

    // changing the values in try statement in order to catch null errors
    try {
        // updating the values if the given new value is not null
        product.Name = (req.body.Product.Name ? req.body.Product.Name : product.Name);
        product.LowerHeader = (req.body.Product.LowerHeader ? req.body.Product.LowerHeader : product.LowerHeader );
        product.Description = (req.body.Product.Description ? req.body.Product.Description : product.Description);
        product.Price = (req.body.Product.Price ? req.body.Product.Price : product.Price);
        product.Thumbnail = (req.body.Product.Thumbnail ? req.body.Product.Thumbnail : product.Thumbnail);
        product.Images = (req.body.Product.Images ? req.body.Product.Images : product.Images);
        product.SalePercentage = (req.body.Product.SalePercentage ? req.body.Product.SalePercentage : product.SalePercentage);
        product.Stock =(req.body.Product.Stock ? req.body.Product.Stock : product.Stock);
        product.TechnicalDetails = (req.body.Product.TechnicalDetails ? req.body.Product.TechnicalDetails : product.TechnicalDetails);
        product.Categories = (newCats ? newCats : product.Categories);

        // Saving the changes
        product.save();
    }catch {
        // error response if an value was not received
        res.status(503).json({
            Message: 'Manglende værdier',
            Product: null
        });
        return;
    }

    // Success response
    res.json({
        Message: "success",
        Product: product
    });
});

module.exports = router;