const express = require('express');
const router = express.Router();

const logic = require('../../Logic/GetAnyOrder');

router.get('/:ID', async (req, res) => {
    try {
        let order = await logic.Execute(req.headers.jwt, req.params.ID);

        res.json({
            Message: 'Success',
            Order: order
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Message: e.msg,
                Order: null
            });
        }else {
            res.status(503).json({
                Message: 'Der skete en fejl, prøv igen senere',
                Order: null
            });
        }
    }
});

module.exports = router;