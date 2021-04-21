const express = require('express');
const axios = require('axios');
require('dotenv').config();
const Product = require('../Schema/Product');

const router = express.Router();

router.post('/', async (req, res) => {
    let options = { headers: { jwt: req.headers.jwt } }
    let err, response = await axios.post(
        'http://' + process.env.AuthService + '/auth',
        null,
        options
    );

    if(err || !response.data.isAdmin) {
        res.status(403).json({
            message: "unauthorized",
            product: null
        });
        return;
    }

    if(!req.body.product._id) {
        res.status(503).json({
            message: "Intet produkt id var givet",
            product: null
        });
        return;
    }

    let err2, product = await Product.findById(req.body.product._id);
    if(err2 || !product) {
        res.status(404).json({
            message: "Produktet blev ikke fundet",
            product: null
        });
        return;
    }

    product.Name = (req.body.product.name ? req.body.product.name : product.Name);
    product.Description = (req.body.product.description ? req.body.product.description : product.Description);
    product.Price = (req.body.product.price ? req.body.product.price : product.Price);
    product.Image = (req.body.product.image ? req.body.product.image : product.Image);
    product.SalePercentage = (req.body.product.SalePercentage ? req.body.product.SalePercentage : product.SalePercentage);
    product.TechnicalDetails = (req.body.product.TechnicalDetails ? req.body.product.TechnicalDetails : product.TechnicalDetails);

    product.save();

    res.json({
        message: "success",
        product: product
    });
});

module.exports = router;