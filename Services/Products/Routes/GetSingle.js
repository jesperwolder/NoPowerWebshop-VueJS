const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('../Schema/Product');

const router = express.Router();

router.get('/:id', async (req, res) => {
    let prods = [];
    if(req.params.id.includes(',')) {
        let IDs = req.params.id.split(',');
        let failed = false;

        for (id of IDs) {
            try {
                mongoose.Types.ObjectId(id);
            }catch{
                failed = true;
            }
            if(failed) break;

            let err, product = await Product.findById(id);
            if(err || !product) {
                failed = true;
                break;
            }else {
                product.Creator = null;
                prods.push(product);
            }
        }

        if(failed) {
            res.status(404).json({
                Message: 'Nogle produkter blev ikke fundet',
                Products: null
            });
            return;
        }

        res.json({
            Message: 'Success',
            Products: prods
        });
    }else {
        try {
            mongoose.Types.ObjectId(req.params.id);
        }catch{
            res.status(404).json({
                Message: 'Det blev ikke fundet noget produkt',
                Products: null
            });
            return;
        }
        
        let err, product = await Product.findById(req.params.id);
        if(err || !product) {
            res.status(404).json({
                Message: 'Nogle produkter blev ikke fundet',
                Products: null
            });
        }

        product.Creator = null;
        res.json({
            Message: 'Success',
            Products: [ product ]
        });
    }
});

module.exports = router;