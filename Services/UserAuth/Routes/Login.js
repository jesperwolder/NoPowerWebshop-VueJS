const express = require('express');
const router = express.Router();
const logic = require('../Logic/Login');

router.post('/', async (req, res) => {
    try{
        let obj = await logic.Execute(req.body.User.Email, req.body.User.Password);
        res.json({
            Message: 'Success',
            Authorized: true,
            Jwt: obj.jwt,
            isAdmin: obj.user.isAdmin
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Message: e.msg,
                Authorized: false,
                Jwt: null,
                isAdmin: false
            });
        }else {
            console.log(e);
            res.status(404).json({
                Message: 'Der skete en fejl prøv igen senere',
                Authorized: false,
                Jwt: null,
                isAdmin: false
            });
        }
    }

});

module.exports = router;