const express = require('express');
const router = express.Router();

const logic = require('../../Logic/UpdateStatus');

router.post('/', async (req, res) => {
    try {
        let order = await logic.Execute(req.headers.jwt, 
            req.body.Order._id, 
            req.body.Order.Status
        );

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