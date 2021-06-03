const express = require('express');
const router = express.Router();

const logic = require('../Logic/GetSingleOrMultiple');

router.get('/:ids', async (req, res) => {
    try {
        let products = await logic.Execute(req.params.ids);

        res.json({
            Message: 'Success',
            Products: products
        });
    }catch(e){
        if(e.hasOwnProperty('code')){
            res.status(e.code).json({
                Message: e.msg,
                Products: null
            });
        }else {
            console.log(e);
            res.status(404).json({
                Message: 'Der skete en ukendt fejl, prøv igen senere',
                Products: null
            });
        }
    }
});

module.exports = router;