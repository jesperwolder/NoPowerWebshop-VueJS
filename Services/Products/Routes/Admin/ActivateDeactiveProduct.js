const express = require('express');
const router = express.Router();

const logic = require('../../Logic/ActivateDeactivateProduct');

router.post('/:ID/:status', async (req, res) => {
    try {
        console.log(req.params.status);
        let status = false;
        if(req.params.status == "true") status = true;
        let product = await logic.Execute(req.headers.jwt, req.params.ID, status);

        res.json({
            Message: 'Success',
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