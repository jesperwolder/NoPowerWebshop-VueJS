const express = require('express');
const router = express.Router();

const logic = require('../Logic/UpdateProfile');

router.post('/', async (req, res) => {
    try {
        let user = await logic.Execute(
            req.headers.jwt,
            req.body.User.Email,
            req.body.User.Fullname,
            req.body.User.Phone,
            req.body.User.Address.Street,
            req.body.User.Address.Number,
            req.body.User.Address.Zip,
            req.body.User.Address.City
        );
        res.json({
            Message: 'Success',
            User: user
        });
    }catch(e) {
        if(e.hasOwnProperty('code')){
            res.status(e.code).json({
                Message: e.msg,
                User: null
            });
        }else {
            console.log(e);
            res.status(404).json({
               Message: 'Der skete en fejl, prøv igen',
               User: null 
            });
        }
    }
});

module.exports = router;