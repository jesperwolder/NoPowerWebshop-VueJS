const express = require('express');
const router = express.Router();

const logic = require('../../Logic/Statuses');

router.get('/', async (req, res) => {
    try {
        let statuses = await logic.Execute(req.headers.jwt);
        
        res.json({
            Message: 'Success',
            Statuses: statuses
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Message: e.msg,
                Statuses: null
            });
        }else {
            console.log(e);
            res.status(503).json({
                Message: 'Der skete en fejl, prøv igen senere',
                Statuses: null
            });
        }
    }
});

module.exports = router;