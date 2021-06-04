const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        //let Order = await Create.Execute(req.body.ProductIDs, req.headers.jwt);
        res.json({
            Message: 'Success',
            Order: Order
        });
    }catch(e) {
        console.log(e);
        res.status(e.code).json({
            Message: e.msg,
            Order: null
        });
    }
});

module.exports = router;