const express = require('express');
const User = require('../Schema/UserInfo.js');
const auth = require('../modules/authentication.js')
const router = express.Router();

router.post('/', async (req, res) => {
    if(!req.body.Email || !req.body.Password) {
        res.status(400).json({
            Authorized: false,
            Jwt: null,
            Message: "Manglende værdier" 
        });
        return
    }

    console.log('/login -> ' + req.body.email);

    let err, user = await User.findOne({ Email: req.body.email });
    if(err || !user) {
        res.status(503).json({
            Authorized: false,
            Jwt: null,
            Message: "Der blev ikke fundet en bruger"
        });
        return;
    }

    if(!(await auth.Compare(req.body.Password, user.Password))){
        res.status(401).json({
            Authorized: false,
            Jwt: null,
            Message: "Forkert email eller password"
        });
        return;
    }

    let jwt = auth.SignJwt({ _id: user._id, Email: req.body.email });
    res.status(200).json({
        Authorized: true,
        Jwt: jwt,
        isAdmin: user.isAdmin,
        Message: "Success"
    });
});

module.exports = router;