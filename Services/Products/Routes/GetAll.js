const express = require('express');
const router = express.Router();

const logic = require('../Logic/GetAll');

router.get('/:limit/:page', async (req, res) => {
    try {
        let products = await logic.Execute(req.headers.jwt, req.params.limit, req.params.page);
        
        res.json({
            Message: 'Success',
            Products: products
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Message: e.msg,
                Products: null
            });
        }else {
            console.log(e);
            res.status(404).json({
                Message: 'Det skete en ukendt fejl, prøv igen senere',
                Products: null
            });
        }
    }
});

module.exports = router;