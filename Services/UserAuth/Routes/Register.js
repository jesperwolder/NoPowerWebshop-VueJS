const express = require('express');
const router = express.Router();

const logic = require('../Logic/Register');

router.post('/', async (req, res) => {
    try {
        let obj = await logic.Execute(
            req.body.User.Email,
            req.body.User.Fullname,
            req.body.User.Password,
            req.body.User.Phone,
            req.body.User.Address.Street,
            req.body.User.Address.Number,
            req.body.User.Address.Zip,
            req.body.User.Address.City
        );

        res.json({
            Auhtorized: true,
            Jwt: obj.jwt,
            Message: 'Success'
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Auhtorized: false,
                Jwt: null,
                Message: e.msg
            });
        }else {
            console.log(e);
            res.status(404).json({
                Message: 'Der skete en fejl, prøv igen',
                Jwt: null,
                Auhtorized: false
            });
        }
    }
});

module.exports = router;