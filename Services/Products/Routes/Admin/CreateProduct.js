const express = require('express');
const router = express.Router();

const logic = require('../../Logic/CreateProduct');

router.post('/', async (req, res) => {
    try {
        let product = await logic.Execute(
            req.headers.jwt,
            req.body.Product.Name,
            req.body.Product.LowerHeader,
            req.body.Product.Description,
            req.body.Product.Price,
            req.body.Product.SalePercentage,
            req.body.Product.Thumbnail,
            req.body.Product.Images,
            req.body.Product.Stock,
            req.body.Product.Categories,
            req.body.Product.TechnicalDetails
        );
        
        res.json({
            Message: 'success',
            Product: product
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Message: e.msg,
                Product: null
            });
        }else {
            console.log(e);
            res.status(404).json({
                Message: 'Der skete en teknisk fejl, prøv igen senere',
                Product: null
            });
        }
    }

});

module.exports = router;