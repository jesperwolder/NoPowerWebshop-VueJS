const express = require('express');
const User = require('../Schema/UserInfo');

const logic = require('../Logic/GetAllUsers');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let users = await logic.Execute(req.headers.jwt);

        res.status(200).json({
            Message: 'Success',
            Users: users
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Message: e.msg,
                Users: null
            });
        }else {
            console.log(e);
            res.status(404).json({
                Message: 'Der skete en fejl prøv igen senere',
                Users: null
            });
        }
    }
});

module.exports = router;