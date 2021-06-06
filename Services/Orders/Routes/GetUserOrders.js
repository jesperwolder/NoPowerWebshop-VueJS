const express = require('express');
const router = express.Router();

const logic = require('../Logic/GetUserOrders');


router.get('/', async (req, res) => {
    try {
        if(!req.headers.jwt) throw { msg: 'Ingen jwt givet', code: 403 };
        let orders = await logic.Execute(req.headers.jwt);

        res.json({
            Message: 'Success',
            Orders: orders
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Message: e.msg,
                Orders: null
            });
        }else {
            console.log(e);
            res.status(503).json({
                Message: 'Der skete en fejl, prøv igen senere',
                Orders: null
            });
        }
    }
});

module.exports = router;