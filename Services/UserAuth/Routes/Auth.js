const express = require('express');
const router = express.Router();

let logic = require('../Logic/Auth');

router.post('/', async (req, res) => {
    try {
        let user = await logic.Execute(req.headers.jwt);

        res.status(200).json({
            Authorized: true,
            isAdmin: user.isAdmin,
            User: user,
            Message: "Success"
        });
    }catch(e) {
        if(e.hasOwnProperty('code')) {
            res.status(e.code).json({
                Authorized: false,
                isAdmin: false,
                User: null,
                Message: e.msg
            });
        }else {
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