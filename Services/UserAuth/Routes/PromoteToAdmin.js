const express = require('express');
const router = express.Router();

const logic = require('../Logic/PromoteToAdmin');

router.post('/:status', async (req, res) => {
    try {
        let status = false;
        if(req.params.status == "true") status = true; 
        let user = await logic.Execute(req.body.UserID, req.headers.jwt, status);

        res.json({
            Message: 'Success',
            User: user
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Message: e.msg,
                User: null
            });
        }else {
            console.log(e);
            res.status(404).json({
                Message: 'Der skete en teknisk fejl, prøv igen senere',
                User: null
            });
        }
    }
});

module.exports = router;